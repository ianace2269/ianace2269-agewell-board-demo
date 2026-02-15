export default function Home() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div style={{ minHeight: "100vh", background: "#ebe7f7" }}>
      <div
        style={{
          height: 80,
          background: "#c7bdea",
          display: "flex",
          alignItems: "center",
          paddingLeft: 40,
          fontSize: 24,
          fontWeight: 600,
          color: "white"
        }}
      >
        AgeWellAlly
      </div>

      <div style={{ padding: 40 }}>
        <div
          style={{
            border: "12px solid #b58a64",
            borderRadius: 20,
            padding: 40,
            background: "linear-gradient(180deg,#e9d8b2,#ddc492)"
          }}
        >
          <h2 style={{ marginTop: 0 }}>{today}</h2>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: 999,
                background: "rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              Avatar
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>Good Morning, Anne</div>
              <div style={{ opacity: 0.7, marginTop: 6 }}>Let’s get the day started</div>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <button style={{ padding: 12, marginRight: 10 }}>Agenda</button>
            <button style={{ padding: 12, marginRight: 10 }}>Calendar</button>
            <button style={{ padding: 12, marginRight: 10 }}>Messages</button>
            <button style={{ padding: 12, marginRight: 10 }}>Files</button>
            <button style={{ padding: 12, marginRight: 10 }}>Photos</button>
            <button style={{ padding: 12, marginRight: 10 }}>Notes</button>
            <button style={{ padding: 12, marginRight: 10 }}>To Do</button>
            <button style={{ padding: 12, marginRight: 10 }}>RX</button>
            <button style={{ padding: 12, marginRight: 10 }}>Games</button>
          </div>

          <div style={{ marginTop: 40 }}>
            <h3 style={{ marginBottom: 10 }}>My Agenda</h3>
            <ul style={{ marginTop: 0 }}>
              <li>8:00 AM Breakfast</li>
              <li>2:00 PM Walk</li>
              <li>7:30 PM Call Family</li>
            </ul>
          </div>

          <div style={{ marginTop: 30, display: "flex", gap: 12 }}>
            <input
              placeholder="Type a request, add a task, or open an item"
              style={{
                flex: 1,
                padding: "14px 16px",
                borderRadius: 999,
                border: "1px solid rgba(0,0,0,0.15)"
              }}
            />
            <button
              style={{
                width: 48,
                height: 48,
                borderRadius: 999,
                border: "none",
                background: "#6d4ad2",
                color: "white",
                fontWeight: 700
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
