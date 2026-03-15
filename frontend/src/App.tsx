import { useState } from "react";

const BACKEND = "satisfied-blessing-production-6298.up.railway.app";

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
    <div style={{
      fontFamily: "'Segoe UI', sans-serif",
      background: "#0a0f0d",
      minHeight: "100vh",
      color: "#e0f2e9",
      padding: "0 0 40px 0"
    }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0d2b1e, #1a4a32)",
        padding: "20px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #1f4d35"
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, color: "#4ade80", letterSpacing: 1 }}>
            🌿 EcoTrack
          </h1>
          <p style={{ margin: 0, fontSize: 12, color: "#6b9e7e" }}>
            AI Carbon Footprint Assistant
          </p>
        </div>
        <div style={{
          background: "#1a4a32",
          border: "1px solid #2d6e4a",
          borderRadius: 20,
          padding: "6px 16px",
          fontSize: 13,
          color: "#4ade80"
        }}>
          🟢 Live
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 24px" }}>

        {/* Score Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Today's CO₂", value: `${totalCo2} kg`, color: "#f87171", icon: "💨" },
            { label: "Eco Streak", value: `${streak} days 🔥`, color: "#fb923c", icon: "⚡" },
            { label: "Total Saved", value: "7.2 kg", color: "#4ade80", icon: "🌍" },
          ].map(card => (
            <div key={card.label} style={{
              background: "#111a14",
              border: "1px solid #1f3d2a",
              borderRadius: 16,
              padding: "20px 16px",
              textAlign: "center",
              transition: "transform 0.2s"
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontSize: 11, color: "#6b9e7e", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
                {card.label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, color: card.color }}>
                {card.value}
              </div>
            </div>
          ))}
        </div>

        {/* AI Suggestion */}
        <div style={{
          background: "#111a14",
          border: "1px solid #1f3d2a",
          borderRadius: 16,
          padding: 24,
          marginBottom: 24
        }}>
          <h2 style={{ margin: "0 0 16px", color: "#4ade80", fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
            🤖 AI Eco Suggestion
          </h2>
          {tip && (
            <div style={{
              background: "#0d2b1e",
              border: "1px solid #2d6e4a",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              color: "#a7f3d0",
              lineHeight: 1.7,
              fontSize: 14
            }}>
              {tip}
            </div>
          )}
          <button
            onClick={getSuggestion}
            disabled={loading}
            style={{
              background: loading ? "#1a4a32" : "linear-gradient(135deg, #16a34a, #4ade80)",
              color: loading ? "#6b9e7e" : "#0a0f0d",
              border: "none",
              padding: "12px 24px",
              borderRadius: 10,
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 0.5
            }}>
            {loading ? "⏳ Getting suggestion..." : "✨ Get AI Suggestion"}
          </button>
        </div>

        {/* Activity Feed */}
        <div style={{
          background: "#111a14",
          border: "1px solid #1f3d2a",
          borderRadius: 16,
          padding: 24,
          marginBottom: 24
        }}>
          <h2 style={{ margin: "0 0 16px", color: "#4ade80", fontSize: 16 }}>
            📍 Today's Activities
          </h2>
          {mockLogs.map((log, i) => (
            <div key={log.id} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              borderRadius: 10,
              marginBottom: 8,
              background: i % 2 === 0 ? "#0d2b1e" : "#0f1f16",
              border: "1px solid #1a3d28"
            }}>
              <span style={{ fontSize: 20 }}>{modeIcon[log.mode]}</span>
              <span style={{ color: "#a7f3d0", textTransform: "capitalize" }}>{log.mode}</span>
              <span style={{
                color: log.co2_kg > 0 ? "#f87171" : "#4ade80",
                fontWeight: 500
              }}>
                {log.co2_kg > 0 ? `+${log.co2_kg} kg CO₂` : "✅ Zero emission"}
              </span>
              <span style={{ color: "#4b7a60", fontSize: 12 }}>{log.time}</span>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div style={{
          background: "#111a14",
          border: "1px solid #1f3d2a",
          borderRadius: 16,
          padding: 24,
          marginBottom: 24
        }}>
          <h2 style={{ margin: "0 0 16px", color: "#4ade80", fontSize: 16 }}>
            🏅 Badges Earned
          </h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { icon: "🌱", title: "First Step", desc: "First eco choice", color: "#16a34a" },
              { icon: "🔥", title: "3-Day Streak", desc: "3 days in a row", color: "#ea580c" },
              { icon: "🌍", title: "5kg Saved", desc: "Saved 5kg CO₂", color: "#0891b2" },
            ].map(b => (
              <div key={b.title} style={{
                background: "#0d2b1e",
                border: `1px solid ${b.color}44`,
                borderRadius: 12,
                padding: "14px 18px",
                textAlign: "center",
                minWidth: 100,
                flex: 1
              }}>
                <div style={{ fontSize: 32, marginBottom: 6 }}>{b.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: b.color, marginBottom: 4 }}>
                  {b.title}
                </div>
                <div style={{ fontSize: 11, color: "#6b9e7e" }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div style={{
          background: "#111a14",
          border: "1px solid #1f3d2a",
          borderRadius: 16,
          padding: 24
        }}>
          <h2 style={{ margin: "0 0 16px", color: "#4ade80", fontSize: 16 }}>
            🏆 Leaderboard
          </h2>
          {mockLeaderboard.map((u, i) => (
            <div key={u.name} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              borderRadius: 10,
              marginBottom: 8,
              background: u.name === "You" ? "#0d2b1e" : "#0f1f16",
              border: u.name === "You" ? "1px solid #4ade80" : "1px solid #1a3d28"
            }}>
              <span style={{ fontSize: 20 }}>
                {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
              </span>
              <span style={{
                color: u.name === "You" ? "#4ade80" : "#a7f3d0",
                fontWeight: u.name === "You" ? 600 : 400,
                flex: 1,
                marginLeft: 12
              }}>
                {u.name}
              </span>
              <span style={{ color: "#4ade80", fontWeight: 500 }}>
                {u.saved} kg saved 🌿
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}