import { useEffect, useState } from "react";
import axios from "axios";
import IdeaForm from "./componenents/IdeaForm";
import IdeaList from "./componenents/IdeaList";

function App() {
  const [ideas, setIdeas] = useState([]);
  const API = "https://cashflowcrew-assignment-vaus.onrender.com/api/ideas";;

  const fetchIdeas = async () => {
    const res = await axios.get(API);
    setIdeas(res.data);
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div style={{
      minHeight: "100svh",
      background: "#0d0d14",
      padding: "48px 16px",
      fontFamily: "'Inter', system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
    }}>

      {/* Background blobs */}
      <div style={{
        position: "absolute", top: -220, left: -220,
        width: 580, height: 580, borderRadius: "50%",
        background: "rgba(109,40,217,0.15)",
        filter: "blur(110px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -180, right: -180,
        width: 500, height: 500, borderRadius: "50%",
        background: "rgba(67,56,202,0.1)",
        filter: "blur(100px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 600, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.25)",
            borderRadius: 999, padding: "5px 14px", marginBottom: 20,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#a78bfa", display: "inline-block",
              animation: "blink 2s infinite",
            }} />
            <span style={{
              color: "#c4b5fd", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
            }}>Beta</span>
          </div>

          <div style={{
            fontSize: 58, fontWeight: 900, letterSpacing: "-2.5px",
            lineHeight: 1, color: "#fff", marginBottom: 10,
            fontFamily: "'Syne', system-ui, sans-serif",
          }}>
            Idea<span style={{ color: "#818cf8" }}>Spark</span>
          </div>

          <p style={{
            color: "#52525b", fontSize: 13, fontWeight: 500,
            letterSpacing: "0.06em", margin: 0,
          }}>
            Capture · Upvote · Build
          </p>
        </div>

        {/* Form card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20, padding: 22, marginBottom: 12,
        }}>
          <IdeaForm fetchIdeas={fetchIdeas} />
        </div>

        {/* List header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "0 2px", marginBottom: 10,
        }}>
          <span style={{
            color: "#3f3f46", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
          }}>All Ideas</span>
          <span style={{
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: 999, padding: "2px 10px",
            color: "#a78bfa", fontSize: 11, fontWeight: 600,
          }}>
            {ideas.length} {ideas.length === 1 ? "idea" : "ideas"}
          </span>
        </div>

        {/* List */}
        <IdeaList ideas={ideas} fetchIdeas={fetchIdeas} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@900&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0d0d14; }
        #root { min-height: 100svh; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.35} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}

export default App;