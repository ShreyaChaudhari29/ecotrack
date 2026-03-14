import { useState, useEffect } from "react";

const BACKEND = "http://127.0.0.1:8000";

const mockLogs = [
  { id: 1, mode: "vehicle", co2_kg: 2.5, time: "9:00 AM" },
  { id: 2, mode: "walking", co2_kg: 0, time: "12:00 PM" },
  { id: 3, mode: "cycling", co2_kg: 0, time: "5:00 PM" },
];

const mockLeaderboard = [
  { name: "Priya", saved: 12.4 },
  { name: "Rahul", saved: 9.8 },
  { name: "You", saved: 7.2 },
];

const modeIcon: Record<string, string> = {
  vehicle: "🚗",
  walking: "🚶",
  cycling: "🚴",
  stationary: "🪑",
};

export default function App() {
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);
  const [streak] = useState(3);
  const [totalCo2] = useState(2.5);

  const getSuggestion = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/get-suggestion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "vehicle", today_co2: totalCo2 }),
      });
      const data = await res.json();
      setTip(data.tip);
    } catch {
      setTip("Could not fetch suggestion. Make sure backend is running!");
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 800,
      margin: "0 auto", padding: 24, background: "#f0faf4", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#1D6E4E", color: "white", padding: "16px 24px",
        borderRadius: 12, marginBottom: 20, display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ margin: 0, fontSize: 24 }}>🌿 EcoTrack</h1>
        <span style={{ fontSize: 14, opacity: 0.8 }}>AI Carbon Tracker</span>
      </div>

      {/* Score Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        gap: 12, marginBottom: 20 }}>
        <div style={{ background: "white", padding: 16, borderRadius: 12,
          border: "0.5px solid #ccc", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#666" }}>Today's CO₂</div>
          <div style={{ fontSize: 32, fontWeight: 500, color: "#1D6E4E" }}>{totalCo2} kg</div>
        </div>
        <div style={{ background: "white", padding: 16, borderRadius: 12,
          border: "0.5px solid #ccc", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#666" }}>Eco Streak</div>
          <div style={{ fontSize: 32, fontWeight: 500, color: "#B7770D" }}>{streak} 🔥</div>
        </div>
        <div style={{ background: "white", padding: 16, borderRadius: 12,
          border: "0.5px solid #ccc", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "#666" }}>Total Saved</div>
          <div style={{ fontSize: 32, fontWeight: 500, color: "#1A5276" }}>7.2 kg</div>
        </div>
      </div>

      {/* AI Suggestion */}
      <div style={{ background: "white", padding: 16, borderRadius: 12,
        border: "0.5px solid #ccc", marginBottom: 20 }}>
        <h2 style={{ margin: "0 0 12px", color: "#1D6E4E", fontSize: 16 }}>🤖 AI Eco Suggestion</h2>
        {tip && <p style={{ color: "#333", lineHeight: 1.6, marginBottom: 12 }}>{tip}</p>}
        <button onClick={getSuggestion} disabled={loading}
          style={{ background: "#1D6E4E", color: "white", border: "none",
            padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontSize: 14 }}>
          {loading ? "Getting suggestion..." : "Get AI Suggestion 🌱"}
        </button>
      </div>

      {/* Activity Feed */}
      <div style={{ background: "white", padding: 16, borderRadius: 12,
        border: "0.5px solid #ccc", marginBottom: 20 }}>
        <h2 style={{ margin: "0 0 12px", color: "#1D6E4E", fontSize: 16 }}>📍 Today's Activities</h2>
        {mockLogs.map(log => (
          <div key={log.id} style={{ display: "flex", justifyContent: "space-between",
            padding: "8px 0", borderBottom: "0.5px solid #eee" }}>
            <span>{modeIcon[log.mode]} {log.mode}</span>
            <span style={{ color: log.co2_kg > 0 ? "#E74C3C" : "#1D6E4E" }}>
              {log.co2_kg > 0 ? `+${log.co2_kg} kg CO₂` : "✅ Zero emission"}
            </span>
            <span style={{ color: "#999", fontSize: 12 }}>{log.time}</span>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div style={{ background: "white", padding: 16, borderRadius: 12,
        border: "0.5px solid #ccc", marginBottom: 20 }}>
        <h2 style={{ margin: "0 0 12px", color: "#1D6E4E", fontSize: 16 }}>🏅 Badges Earned</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { icon: "🌱", title: "First Step", desc: "First eco choice" },
            { icon: "🔥", title: "3-Day Streak", desc: "3 days in a row" },
            { icon: "🌍", title: "5kg Saved", desc: "Saved 5kg CO₂" },
          ].map(b => (
            <div key={b.title} style={{ background: "#f0faf4", padding: "10px 14px",
              borderRadius: 8, border: "0.5px solid #A8D5BC", textAlign: "center" }}>
              <div style={{ fontSize: 24 }}>{b.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#1D6E4E" }}>{b.title}</div>
              <div style={{ fontSize: 11, color: "#666" }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div style={{ background: "white", padding: 16, borderRadius: 12,
        border: "0.5px solid #ccc" }}>
        <h2 style={{ margin: "0 0 12px", color: "#1D6E4E", fontSize: 16 }}>🏆 Leaderboard</h2>
        {mockLeaderboard.map((u, i) => (
          <div key={u.name} style={{ display: "flex", justifyContent: "space-between",
            padding: "8px 0", borderBottom: "0.5px solid #eee",
            fontWeight: u.name === "You" ? 500 : 400 }}>
            <span>{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"} {u.name}</span>
            <span style={{ color: "#1D6E4E" }}>{u.saved} kg saved</span>
          </div>
        ))}
      </div>
    </div>
  );
}