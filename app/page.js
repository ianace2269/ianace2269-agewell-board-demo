export default function Home() {
  const dateStr = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#ebe7f7",
      fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
      color: "#1f1a2a"
    },
    topbar: {
      height: 86,
      background: "#c7bdea",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px 0 28px",
      boxSizing: "border-box"
    },
    brand: { display: "flex", alignItems: "center", gap: 14, color: "white" },
    brandMark: {
      width: 42,
      height: 42,
      borderRadius: 14,
      background: "rgba(255,255,255,0.22)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 900,
      letterSpacing: 1
    },
    brandTextWrap: { display: "flex", flexDirection: "column", lineHeight: 1.05 },
    brandTitle: { fontSize: 22, fontWeight: 800 },
    brandSubtitle: { fontSize: 12, opacity: 0.85, marginTop: 6 },

    topActions: { display: "flex", alignItems: "center", gap: 10 },
    pillBtn: {
      background: "rgba(255,255,255,0.16)",
      color: "white",
      border: "1px solid rgba(255,255,255,0.24)",
      borderRadius: 10,
      padding: "8px 12px",
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer"
    },
    iconBtn: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: "rgba(255,255,255,0.16)",
      border: "1px solid rgba(255,255,255,0.24)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      cursor: "pointer",
      fontWeight: 900
    },
    userChip: {
      marginLeft: 6,
      display: "flex",
      alignItems: "center",
      gap: 10,
      color: "white",
      fontSize: 13,
      fontWeight: 800
    },
    userDot: {
      width: 10,
      height: 10,
      borderRadius: 999,
      background: "rgba(255,255,255,0.65)"
    },

    stageWrap: { padding: 26 },
    corkFrameOuter: {
      borderRadius: 18,
      background: "linear-gradient(180deg,#caa07a,#b78b66)",
      padding: 14,
      maxWidth: 1120,
      margin: "0 auto"
    },
    corkFrameInner: {
      borderRadius: 14,
      padding: 28,
      background:
        "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.25), rgba(255,255,255,0) 40%), linear-gradient(180deg,#edd9b4,#dfc691)",
      boxShadow: "0 18px 50px rgba(0,0,0,0.18)",
      position: "relative",
      overflow: "hidden"
    },
    corkNoise: {
      position: "absolute",
      inset: 0,
      backgroundImage:
        "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
      backgroundSize: "6px 6px",
      opacity: 0.25,
      pointerEvents: "none"
    },

    boardGrid: {
      display: "grid",
      gridTemplateColumns: "260px 1fr 320px",
      gap: 26,
      alignItems: "start",
      position: "relative",
      zIndex: 1
    },

    pinnedCard: {
      background: "rgba(255,255,255,0.78)",
      borderRadius: 14,
      boxShadow: "0 14px 30px rgba(0,0,0,0.16)",
      border: "1px solid rgba(0,0,0,0.06)",
      position: "relative",
      overflow: "hidden"
    },
    pin: (color) => ({
      position: "absolute",
      top: 10,
      left: 14,
      width: 12,
      height: 12,
      borderRadius: 999,
      background: color,
      boxShadow: "0 6px 14px rgba(0,0,0,0.25)"
    }),

    dateNote: {
      padding: "18px 18px 14px 18px",
      background: "rgba(255,255,255,0.84)"
    },
    dateTitle: { fontSize: 24, fontWeight: 900, margin: 0, letterSpacing: 0.2 },
    dateSub: { marginTop: 4, fontSize: 14, opacity: 0.75, fontWeight: 700 },

    photoFrame: {
      marginTop: 16,
      padding: 12,
      background: "rgba(255,255,255,0.82)"
    },
    photoInner: {
      borderRadius: 12,
      overflow: "hidden",
      background: "linear-gradient(135deg, rgba(0,0,0,0.08), rgba(0,0,0,0.02))",
      height: 210,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "rgba(0,0,0,0.55)",
      fontWeight: 800
    },

    centerStack: { display: "flex", flexDirection: "column", gap: 16 },

    welcomeCard: {
      borderRadius: 14,
      background: "rgba(255,255,255,0.76)",
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 14px 30px rgba(0,0,0,0.14)",
      padding: 18,
      display: "grid",
      gridTemplateColumns: "92px 1fr 64px",
      gap: 14,
      alignItems: "center",
      position: "relative",
      overflow: "hidden"
    },
    assistantAvatar: {
      width: 92,
      height: 92,
      borderRadius: 18,
      background:
        "linear-gradient(180deg, rgba(112,74,210,0.28), rgba(112,74,210,0.10))",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 900,
      color: "#3a2b67"
    },
    welcomeText: { lineHeight: 1.1 },
    welcomeTitle: { margin: 0, fontSize: 20, fontWeight: 900 },
    welcomeSub: { marginTop: 8, marginBottom: 0, fontSize: 13, opacity: 0.72, fontWeight: 700 },
    playBtn: {
      width: 54,
      height: 54,
      borderRadius: 999,
      background: "#6d4ad2",
      color: "white",
      border: "none",
      fontWeight: 900,
      cursor: "pointer",
      boxShadow: "0 12px 24px rgba(109,74,210,0.35)"
    },

    tilesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: 12,
      alignContent: "start"
    },
    tile: (bg, accent) => ({
      height: 46,
      borderRadius: 10,
      background: bg,
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 10px 18px rgba(0,0,0,0.10)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 900,
      fontSize: 13,
      color: accent,
      cursor: "pointer",
      userSelect: "none"
    }),

    rightPanel: {
      borderRadius: 14,
      background: "rgba(255,255,255,0.76)",
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 14px 30px rgba(0,0,0,0.14)",
      padding: 16,
      position: "relative",
      overflow: "hidden"
    },
    rightHeaderRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10
    },
    rightTitle: { fontSize: 18, fontWeight: 900, margin: 0 },
    agendaSection: { marginTop: 14 },
    agendaLabel: { fontSize: 12, fontWeight: 900, opacity: 0.72 },
    agendaItem: { marginTop: 10, fontSize: 14, fontWeight: 800, opacity: 0.9 },

    bottomRow: { marginTop: 20, display: "flex", gap: 12, alignItems: "center" },
    input: {
      flex: 1,
      height: 56,
      borderRadius: 999,
      border: "1px solid rgba(0,0,0,0.14)",
      padding: "0 18px",
      fontSize: 15,
      boxShadow: "0 10px 22px rgba(0,0,0,0.10)",
      background: "rgba(255,255,255,0.82)",
      outline: "none"
    },
    send: {
      width: 56,
      height: 56,
      borderRadius: 999,
      border: "none",
      background: "#6d4ad2",
      color: "white",
      fontWeight: 900,
      cursor: "pointer",
      boxShadow: "0 12px 24px rgba(109,74,210,0.35)"
    },

    responsiveHint: {
      marginTop: 14,
      fontSize: 12,
      opacity: 0.55,
      fontWeight: 700
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.topbar}>
        <div style={styles.brand}>
          <div style={styles.brandMark}>∞</div>
          <div style={styles.brandTextWrap}>
            <div style={styles.brandTitle}>AgeWellAlly</div>
            <div style={styles.brandSubtitle}>An Intelligent Hub For Modern Caregiving</div>
          </div>
        </div>

        <div style={styles.topActions}>
          <button style={styles.pillBtn}>Help</button>
          <button style={styles.iconBtn} aria-label="Notifications">🔔</button>
          <button style={styles.pillBtn}>Block Editor</button>
          <button style={styles.pillBtn}>Set company</button>
          <div style={styles.userChip}>
            <span style={styles.userDot} />
            <span>ernie</span>
          </div>
        </div>
      </div>

      <div style={styles.stageWrap}>
        <div style={styles.corkFrameOuter}>
          <div style={styles.corkFrameInner}>
            <div style={styles.corkNoise} />

            <div style={styles.boardGrid}>
              {/* Left column */}
              <div>
                <div style={{ ...styles.pinnedCard, marginBottom: 16 }}>
                  <div style={styles.pin("#7c5cff")} />
                  <div style={styles.dateNote}>
                    <div style={styles.dateTitle}>
                      {dateStr.split(",")[0].toUpperCase()}
                    </div>
                    <div style={styles.dateSub}>
                      {dateStr.substring(dateStr.indexOf(",") + 2)}
                    </div>
                  </div>
                </div>

                <div style={styles.pinnedCard}>
                  <div style={styles.pin("#5ad18c")} />
                  <div style={styles.photoFrame}>
                    {/* Replace this with a real image later */}
                    <div style={styles.photoInner}>Photo</div>
                  </div>
                </div>
              </div>

              {/* Center column */}
              <div style={styles.centerStack}>
                <div style={styles.welcomeCard}>
                  <div style={styles.assistantAvatar}>AI</div>
                  <div style={styles.welcomeText}>
                    <p style={styles.welcomeTitle}>Good Morning, Anne!</p>
                    <p style={styles.welcomeSub}>Let’s get the day started.</p>
                  </div>
                  <button style={styles.playBtn} aria-label="Play greeting">
                    ▶
                  </button>
                </div>

                <div style={styles.tilesGrid}>
                  <div style={styles.tile("linear-gradient(180deg,#7f5cff,#6d4ad2)", "white")}>AGENDA</div>
                  <div style={styles.tile("rgba(255,255,255,0.78)", "#3a2b67")}>Calendar</div>
                  <div style={styles.tile("rgba(255,255,255,0.78)", "#3a2b67")}>Messages</div>

                  <div style={styles.tile("rgba(255,255,255,0.78)", "#3a2b67")}>Files</div>
                  <div style={styles.tile("rgba(255,255,255,0.78)", "#3a2b67")}>Photos</div>
                  <div style={styles.tile("rgba(255,255,255,0.78)", "#3a2b67")}>Notes</div>

                  <div style={styles.tile("rgba(255,255,255,0.78)", "#3a2b67")}>To Do</div>
                  <div style={styles.tile("rgba(185,240,255,0.85)", "#1d3b52")}>RX</div>
                  <div style={styles.tile("rgba(180,60,60,0.85)", "white")}>Games</div>
                </div>

                <div style={styles.bottomRow}>
                  <input
                    style={styles.input}
                    placeholder="Type a request, add a task, or open an item"
                  />
                  <button style={styles.send} aria-label="Send">
                    →
                  </button>
                </div>

                <div style={styles.responsiveHint}>
                  Tip: replace the Photo placeholder with a resident or family image, and swap the AI card for your video module.
                </div>
              </div>

              {/* Right column */}
              <div style={styles.rightPanel}>
                <div style={styles.pin("#ff4d4d")} />

                <div style={styles.rightHeaderRow}>
                  <p style={styles.rightTitle}>My Agenda</p>
                  <div style={{ opacity: 0.65, fontWeight: 900, fontSize: 12 }}>Today</div>
                </div>

                <div style={styles.agendaSection}>
                  <div style={styles.agendaLabel}>☕ Morning</div>
                  <div style={styles.agendaItem}>8:00 AM Breakfast</div>
                </div>

                <div style={styles.agendaSection}>
                  <div style={styles.agendaLabel}>🌻 Afternoon</div>
                  <div style={styles.agendaItem}>2:00 PM Walk</div>
                </div>

                <div style={styles.agendaSection}>
                  <div style={styles.agendaLabel}>🌙 Evening</div>
                  <div style={styles.agendaItem}>7:30 PM Call Family</div>
                </div>
              </div>
            </div>
            {/* end grid */}
          </div>
        </div>
      </div>
    </div>
  );
}
