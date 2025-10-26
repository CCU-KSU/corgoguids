const functions = require("firebase-functions");
const admin = require("firebase-admin");

try { admin.initializeApp(); } catch (_) {}
const db = admin.firestore();

const norm = (str) => String(str || "").trim().toLowerCase();

exports.recommendations = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Use POST request" });
    }

    const { interests } = req.body || {};
    if (!Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({ error: "Missing interests array" });
    }

    const normalized = interests.map(norm);
    const appsSnap = await db.collection("apps").get();
    const results = [];

    appsSnap.forEach((doc) => {
      const data = doc.data();
      const appTags = (data.tags || []).map(norm);

      const match = appTags.some(tag => normalized.includes(tag));
      if (match) {
        results.push({
          appId: doc.id,
          name: data.name,
          tags: data.tags,
        });
      }
    });

   // return res.set("Content-Type", "application/json").send(
   //       JSON.stringify({ results }, null, 2) // <-- pretty print
   //     );
    return res.set("Content-Type", "application/json").send(
          JSON.stringify(
            {
              count: results.length,
              results
            },
            null,
            2
          )
        );


  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

