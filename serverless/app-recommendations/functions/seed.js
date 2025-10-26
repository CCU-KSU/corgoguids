const admin = require("firebase-admin");
const projectId = process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || "demo-corgo";
try { admin.initializeApp({ projectId }); } catch (_) {}
const db = admin.firestore();
// If running against emulator, set FIRESTORE_EMULATOR_HOST=127.0.0.1:8080



const apps = [
  { name: "Google",      tags: ["search","assistant","maps"], platforms: ["web","android","ios"] },
  { name: "Strava",      tags: ["fitness","running","walking","cycling"], platforms: ["android","ios","web"] },
  { name: "Pinterest",   tags: ["gardening","ideas","diy"], platforms: ["android","ios","web"] },
  { name: "Reddit",      tags: ["communities","gardening","tech","news"], platforms: ["android","ios","web"] },
  { name: "Calm",        tags: ["wellness","sleep","meditation"], platforms: ["android","ios"] },
  { name: "Notion",      tags: ["productivity","notes","organization"], platforms: ["web","android","ios"] },
  { name: "Spotify",     tags: ["music","audio","playlist"], platforms: ["android","ios","web"] },
  { name: "Todoist",     tags: ["tasks","productivity","planning"], platforms: ["android","ios","web"] },
  { name: "Duolingo",    tags: ["learning","language","study"], platforms: ["android","ios","web"] },
  { name: "Headspace",   tags: ["meditation","wellness","sleep"], platforms: ["android","ios","web"] },
  { name: "MyFitnessPal",tags: ["fitness","nutrition","calories"], platforms: ["android","ios","web"] },
  { name: "Forest",      tags: ["focus","pomodoro","productivity"], platforms: ["android","ios"] },
  { name: "Uber",        tags: ["transportation","travel","mobility"], platforms: ["android","ios","web"] },
  { name: "Canva",       tags: ["design","graphics","social"], platforms: ["web","android","ios"] },
  { name: "Coursera",    tags: ["education","courses","learning"], platforms: ["web","android","ios"] },
  { name: "Signal",      tags: ["communication","messaging","privacy"], platforms: ["android","ios","web"] },
  { name: "Grammarly",   tags: ["writing","grammar","editing"], platforms: ["web","android","ios"] },
  { name: "Pocket",      tags: ["reading","articles","save"], platforms: ["android","ios","web"] },
  { name: "FitOn",       tags: ["fitness","workout","exercise"], platforms: ["android","ios"] },
  { name: "Blinkist",    tags: ["books","learning","summary"], platforms: ["android","ios","web"] },
  { name: "Shazam",      tags: ["music","discovery","audio"], platforms: ["android","ios"] },
  { name: "Feedly",      tags: ["news","rss","reading"], platforms: ["web","android","ios"] },
  { name: "Clue",        tags: ["health","tracking","wellness"], platforms: ["android","ios"] },
  { name: "Strong",      tags: ["workout","strength","gym"], platforms: ["android","ios"] },
  { name: "Insight Timer",tags: ["meditation","relax","sleep"], platforms: ["android","ios","web"] }
];

(async () => {
  try {
    const batch = db.batch();
    const col = db.collection("apps");
    apps.forEach(a => {
      const ref = col.doc();
      batch.set(ref, a);
    });
    await batch.commit();
    console.log("Seeded apps:", apps.length);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
