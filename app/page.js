"use client";

import React, { useMemo, useRef, useState } from "react";

export default function Home() {
  const dateStr = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const modules = useMemo(
    () => [
      { key: "agenda", label: "AGENDA", style: "primary" },
      { key: "calendar", label: "Calendar", style: "neutral" },
      { key: "messages", label: "Messages", style: "neutral" },
      { key: "files", label: "Files", style: "neutral" },
      { key: "photos", label: "Photos", style: "neutral" },
      { key: "notes", label: "Notes", style: "neutral" },
      { key: "todo", label: "To Do", style: "neutral" },
      { key: "rx", label: "RX", style: "rx" },
      { key: "games", label: "Games", style: "danger" }
    ],
    []
  );

  const [active, setActive] = useState("agenda");
  const [input, setInput] = useState("");

  const [agenda, setAgenda] = useState({
    morning: ["8:00 AM Breakfast"],
    afternoon: ["2:00 PM Walk"],
    evening: ["7:30 PM Call family"]
  });

  const [messages, setMessages] = useState([
    { id: "m1", name: "Mom", text: "Can you remind me what time the appointment is?", at: "9:10 AM" }
  ]);

  const [notes, setNotes] = useState([{ id: "n1", at: "8:05 AM", text: "Hydrate before the afternoon walk." }]);

  const [todos, setTodos] = useState([{ id: "t1", text: "Confirm transportation to doctor", done: false }]);

  // Demo only: in-memory photo objects
  // { id, name, url }
  const [photoItems, setPhotoItems] = useState([]);
  const [featuredPhotoUrl, setFeaturedPhotoUrl] = useState(null);

  const photoInputRef = useRef(null);

  function cryptoId() {
    try {
      return crypto.randomUUID();
    } catch {
      return `id_${Math.random().toString(16).slice(2)}`;
    }
  }

  function nowTime() {
    return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  function detectDayPart(text) {
    const s = text.toLowerCase();
    if (s.includes("morning")) return "morning";
    if (s.includes("afternoon")) return "afternoon";
    if (s.includes("evening") || s.includes("night")) return "evening";
    const timeMatch = s.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/);
    if (!timeMatch) return null;
    const hour = parseInt(timeMatch[1], 10);
    const mer = timeMatch[3];
    if (mer === "am") return "morning";
    if (mer === "pm" && hour < 5) return "afternoon";
    return "evening";
  }

  function submit() {
    const raw = (input || "").trim();
    if (!raw) return;

    if (active === "agenda") {
      const part = detectDayPart(raw) || "morning";
      setAgenda((prev) => ({ ...prev, [part]: [raw, ...prev[part]] }));
      setInput("");
      return;
    }

    if (active === "todo") {
      setTodos((prev) => [{ id: cryptoId(), text: raw, done: false }, ...prev]);
      setInput("");
      return;
    }

    if (active === "notes") {
      setNotes((prev) => [{ id: cryptoId(), at: nowTime(), text: raw }, ...prev]);
      setInput("");
      return;
    }

    if (active === "messages") {
      setMessages((prev) => [...prev, { id: cryptoId(), name: "Family", text: raw, at: nowTime() }]);
      setInput("");
      return;
    }

    setInput("");
  }

  function onKeyDown(e) {
    if (e.key === "Enter") submit();
  }

  function inputPlaceholder() {
    if (active === "agenda") return "Add an agenda item, include a time or morning, afternoon, evening";
    if (active === "todo") return "Add a to do item";
    if (active === "notes") return "Write a note";
    if (active === "messages") return "Post to the family board";
    if (active === "photos") return "Photos are added via Add Photos button";
    return "Type a request";
  }

  function openPhotoPicker() {
    if (photoInputRef.current) photoInputRef.current.click();
  }

  function onPhotosSelected(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newItems = files.map((file) => ({
      id: cryptoId(),
      name: file.name || "photo",
      url: URL.createObjectURL(file)
    }));

    setPhotoItems((prev) => [...newItems, ...prev]);

    // For demo: make the first newly-added image the featured image immediately
    setFeaturedPhotoUrl(newItems[0].url);

    e.target.value = "";
  }

  function removePhoto(id) {
    setPhotoItems((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item?.url) URL.revokeObjectURL(item.url);

      const next = prev.filter((p) => p.id !== id);

      setFeaturedPhotoUrl((current) => {
        if (!current) return null;
        if (item?.url && current === item.url) return next[0]?.url || null;
        return current;
      });

      return next;
    });
  }

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#ebe7f7",
      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
      color: "#1f1a2a"
    },
    topbar: {
      height: 86,
      background: "#c7bdea",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px",
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
    boardGrid: {
      display: "grid",
      gridTemplateColumns: "260px 1fr 360px",
      gap: 26,
      alignItems: "start"
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
    dateNote: { padding: "18px 18px 14px 18px", background: "rgba(255,255,255,0.84)" },
    dateTitle: { fontSize: 24, fontWeight: 900, margin: 0, letterSpacing: 0.2 },
    dateSub: { marginTop: 4, fontSize: 14, opacity: 0.75, fontWeight: 700 },

    photoFrame: { marginTop: 16, padding: 12, background: "rgba(255,255,255,0.82)" },
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
      alignItems: "center"
    },
    assistantAvatar: {
      width: 92,
      height: 92,
      borderRadius: 18,
      background: "linear-gradient(180deg, rgba(112,74,210,0.28), rgba(112,74,210,0.10))",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 900,
      color: "#3a2b67"
    },
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

    tilesGrid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 },
    tileBase: {
      height: 46,
      borderRadius: 10,
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 10px 18px rgba(0,0,0,0.10)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 900,
      fontSize: 13,
      cursor: "pointer",
      userSelect: "none"
    },

    rightPanel: {
      borderRadius: 14,
      background: "rgba(255,255,255,0.76)",
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 14px 30px rgba(0,0,0,0.14)",
      padding: 16,
      position: "relative",
      overflow: "hidden",
      minHeight: 260
    },
    rightHeaderRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
    rightTitle: { fontSize: 18, fontWeight: 900, margin: 0 },
    section: { marginTop: 14 },
    label: { fontSize: 12, fontWeight: 900, opacity: 0.72 },
    item: { marginTop: 10, fontSize: 14, fontWeight: 800, opacity: 0.9 },

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

    addBtn: {
      height: 36,
      borderRadius: 10,
      border: "1px solid rgba(0,0,0,0.10)",
      background: "rgba(255,255,255,0.92)",
      padding: "0 12px",
      fontWeight: 900,
      cursor: "pointer"
    },

    thumbsGrid: {
      marginTop: 12,
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: 10
    },
    thumb: {
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid rgba(0,0,0,0.10)",
      background: "rgba(255,255,255,0.9)",
      boxShadow: "0 10px 18px rgba(0,0,0,0.10)",
      position: "relative",
      cursor: "pointer"
    },
    thumbImg: {
      width: "100%",
      height: 180,
      objectFit: "contain",
      display: "block",
      background: "rgba(0,0,0,0.06)"
    },
    thumbCaption: { padding: "8px 10px", fontSize: 12, fontWeight: 900, opacity: 0.8 },
    thumbX: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 28,
      height: 28,
      borderRadius: 10,
      border: "1px solid rgba(0,0,0,0.10)",
      background: "rgba(255,255,255,0.92)",
      cursor: "pointer",
      fontWeight: 900
    }
  };

  function tileStyle(m) {
    const isActive = active === m.key;
    if (m.style === "primary") {
      return {
        ...styles.tileBase,
        background: isActive ? "linear-gradient(180deg,#7f5cff,#6d4ad2)" : "rgba(255,255,255,0.78)",
        color: isActive ? "white" : "#3a2b67"
      };
    }
    if (m.style === "rx") {
      return { ...styles.tileBase, background: "rgba(185,240,255,0.88)", color: "#1d3b52" };
    }
    if (m.style === "danger") {
      return { ...styles.tileBase, background: "rgba(180,60,60,0.88)", color: "white" };
    }
    return {
      ...styles.tileBase,
      background: isActive ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.78)",
      color: "#3a2b67"
    };
  }

  function rightPanelTitle() {
    const m = modules.find((x) => x.key === active);
    if (!m) return "My Agenda";
    if (m.key === "agenda") return "My Agenda";
    return m.label;
  }

  function RightPanelBody() {
    if (active === "agenda") {
      return (
        <>
          <div style={styles.section}>
            <div style={styles.label}>Morning</div>
            {agenda.morning.map((t, idx) => (
              <div key={`am-${idx}`} style={styles.item}>
                {t}
              </div>
            ))}
          </div>
          <div style={styles.section}>
            <div style={styles.label}>Afternoon</div>
            {agenda.afternoon.map((t, idx) => (
              <div key={`pm-${idx}`} style={styles.item}>
                {t}
              </div>
            ))}
          </div>
          <div style={styles.section}>
            <div style={styles.label}>Evening</div>
            {agenda.evening.map((t, idx) => (
              <div key={`ev-${idx}`} style={styles.item}>
                {t}
              </div>
            ))}
          </div>
        </>
      );
    }

    if (active === "todo") {
      return (
        <div style={styles.section}>
          <div style={styles.label}>To Do</div>
          {todos.map((t) => (
            <div
              key={t.id}
              style={{ marginTop: 10, display: "flex", gap: 10, alignItems: "center", cursor: "pointer", userSelect: "none" }}
              onClick={() => setTodos((prev) => prev.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 6,
                  border: "1px solid rgba(0,0,0,0.18)",
                  background: t.done ? "rgba(109,74,210,0.75)" : "rgba(255,255,255,0.9)"
                }}
              />
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  opacity: t.done ? 0.55 : 0.92,
                  textDecoration: t.done ? "line-through" : "none"
                }}
              >
                {t.text}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (active === "messages") {
      return (
        <div style={styles.section}>
          <div style={styles.label}>Family Message Board</div>
          {messages.map((m) => (
            <div key={m.id} style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 900 }}>
                {m.name} · {m.at}
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, opacity: 0.92, marginTop: 4 }}>{m.text}</div>
            </div>
          ))}
        </div>
      );
    }

    if (active === "photos") {
      return (
        <div style={styles.section}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div style={styles.label}>Photos</div>
            <button style={styles.addBtn} onClick={openPhotoPicker}>
              Add Photos
            </button>
          </div>

          {photoItems.length === 0 ? (
            <div style={{ marginTop: 10, fontSize: 13, opacity: 0.65, fontWeight: 800 }}>Tap Add Photos to pick images.</div>
          ) : (
            <div style={styles.thumbsGrid}>
              {photoItems.map((p) => (
                <div
                  key={p.id}
                  style={styles.thumb}
                  onClick={() => setFeaturedPhotoUrl(p.url)}
                  title="Click to show on the left photo card"
                >
                  <button
                    style={styles.thumbX}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      removePhoto(p.id);
                    }}
                    aria-label="Remove photo"
                  >
                    ×
                  </button>
                  <img src={p.url} alt={p.name} style={styles.thumbImg} />
                  <div style={styles.thumbCaption}>{p.name}</div>
                </div>
              ))}
            </div>
          )}

          <input ref={photoInputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={onPhotosSelected} />
        </div>
      );
    }

    if (active === "notes") {
      return (
        <div style={styles.section}>
          <div style={styles.label}>Notes</div>
          {notes.map((n) => (
            <div key={n.id} style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 900 }}>{n.at}</div>
              <div style={{ fontSize: 14, fontWeight: 800, opacity: 0.92, marginTop: 4 }}>{n.text}</div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div style={styles.section}>
        <div style={styles.label}>Placeholder</div>
        <div style={styles.item}>This module is a placeholder in the demo</div>
      </div>
    );
  }

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
      </div>

      <div style={styles.stageWrap}>
        <div style={styles.corkFrameOuter}>
          <div style={styles.corkFrameInner}>
            <div style={styles.boardGrid}>
              <div>
                <div style={{ ...styles.pinnedCard, marginBottom: 16 }}>
                  <div style={styles.pin("#7c5cff")} />
                  <div style={styles.dateNote}>
                    <div style={styles.dateTitle}>{dateStr.split(",")[0].toUpperCase()}</div>
                    <div style={styles.dateSub}>{dateStr.substring(dateStr.indexOf(",") + 2)}</div>
                  </div>
                </div>

                <div style={styles.pinnedCard}>
                  <div style={styles.pin("#5ad18c")} />
                  <div style={styles.photoFrame}>
                    <div style={styles.photoInner}>
                      {featuredPhotoUrl ? (
                        <img
                          src={featuredPhotoUrl}
                          alt="Featured"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            display: "block",
                            background: "rgba(0,0,0,0.06)"
                          }}
                        />
                      ) : (
                        "Photo"
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.centerStack}>
                <div style={styles.welcomeCard}>
                  <div style={styles.assistantAvatar}>AI</div>
                  <div>
                    <p style={styles.welcomeTitle}>Good Morning, Anne!</p>
                    <p style={styles.welcomeSub}>Tap a tile, then use the input to add an item.</p>
                  </div>
                  <button style={styles.playBtn} aria-label="Play greeting">
                    ▶
                  </button>
                </div>

                <div style={styles.tilesGrid}>
                  {modules.map((m) => (
                    <div
                      key={m.key}
                      style={tileStyle(m)}
                      onClick={() => setActive(m.key)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setActive(m.key);
                      }}
                    >
                      {m.label}
                    </div>
                  ))}
                </div>

                <div style={styles.bottomRow}>
                  <input
                    style={styles.input}
                    placeholder={inputPlaceholder()}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                  />
                  <button style={styles.send} onClick={submit}>
                    →
                  </button>
                </div>
              </div>

              <div style={styles.rightPanel}>
                <div style={styles.pin("#ff4d4d")} />
                <div style={styles.rightHeaderRow}>
                  <p style={styles.rightTitle}>{rightPanelTitle()}</p>
                  <div style={{ opacity: 0.65, fontWeight: 900, fontSize: 12 }}>Today</div>
                </div>
                <RightPanelBody />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
