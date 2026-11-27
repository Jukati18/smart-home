// NC-02 (Viet): handle presence messages from topic smarthome/sensor/motion
// Expected ESP32 payload: {"present": true, "distance": 120}  (distance in cm, optional)
import { config } from "../../config.js";

// Module-level state: unlike CB-01, presence needs memory between messages
let lastSeen = null;       // timestamp (ms) of the last reading with present=true
let absentHandled = false; // true once the timeout action fired, so it runs only once per absence

// Called by server.js for every message on the motion topic
export function handleMotion(raw, broadcast) {
    let data;
    try { data = JSON.parse(raw); } catch { console.warn("[NC-02] invalid JSON:", raw); return; }

    // Validate before use: "present" must be a real boolean
    if (typeof data.present !== "boolean") return;

    const now = Date.now(); // backend timestamp, independent of the ESP clock
    if (data.present) {
        lastSeen = now;        // remember the last time someone was detected
        absentHandled = false; // person is back, re-arm the timeout
    }

    broadcast({
        type: "motion",
        present: data.present,
        distance: typeof data.distance === "number" ? data.distance : null,
        lastSeen, // lets the web show "last seen at ..."
        ts: now,
    });

    // TODO NC-06 (K' Von): trigger the motion alert here when "away mode" is on
    // TODO NC-04 (Viet, week 2): save a motion event to the "events" collection
}

// Background timer: fires onAbsent() once when nobody was seen for config.absentTimeoutMs.
// This also covers the case where the ESP32 stops sending messages entirely.
export function startAbsenceWatcher(broadcast, onAbsent) {
    setInterval(() => {
        if (lastSeen === null || absentHandled) return; // never seen anyone, or already handled
        if (Date.now() - lastSeen < config.absentTimeoutMs) return; // not long enough yet

        absentHandled = true;
        console.log("[NC-02] no presence for the timeout period, running absent actions");
        // Push "absent" to the web even if no new MQTT message arrived
        broadcast({ type: "motion", present: false, distance: null, lastSeen, ts: Date.now() });
        onAbsent();
    }, 5000); // check every 5 seconds
}