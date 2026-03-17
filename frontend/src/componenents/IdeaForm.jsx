import { useState } from "react";
import axios from "axios";

function IdeaForm({ fetchIdeas }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const API = "http://localhost:5000/api/ideas";

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    else if (title.trim().length < 3) newErrors.title = "Title must be at least 3 characters.";

    if (!description.trim()) newErrors.description = "Description is required.";
    else if (description.trim().length < 10) newErrors.description = "Description must be at least 10 characters.";

    if (!author.trim()) newErrors.author = "Author name is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await axios.post(API, { title, description, author });
      setTitle("");
      setDescription("");
      setAuthor("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      fetchIdeas();
    } catch (err) {
      setErrors({ api: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: errors[field] ? "rgba(239,68,68,0.05)" : "rgba(255,255,255,0.05)",
    border: `1px solid ${errors[field] ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.09)"}`,
    borderRadius: 10,
    padding: "11px 14px",
    color: "#fafafa",
    fontSize: 13,
    fontFamily: "'Inter', system-ui, sans-serif",
    outline: "none",
    display: "block",
    boxSizing: "border-box",
    transition: "border-color 0.15s, background 0.15s",
  });

  const errorMsg = (field) => errors[field] ? (
    <div style={{
      display: "flex", alignItems: "center", gap: 5,
      marginTop: 5,
    }}>
      <svg width="11" height="11" fill="none" stroke="#f87171" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span style={{ color: "#f87171", fontSize: 11, fontFamily: "'Inter', system-ui, sans-serif" }}>
        {errors[field]}
      </span>
    </div>
  ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      {/* Label */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
        <div style={{
          width: 18, height: 18, background: "rgba(124,58,237,0.18)",
          borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="10" height="10" fill="none" stroke="#a78bfa" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span style={{ color: "#d4d4d8", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em" }}>
          New Idea
        </span>
      </div>

      {/* API error */}
      {errors.api && (
        <div style={{
          background: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: 8, padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <svg width="14" height="14" fill="none" stroke="#f87171" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span style={{ color: "#f87171", fontSize: 12, fontFamily: "'Inter', system-ui, sans-serif" }}>
            {errors.api}
          </span>
        </div>
      )}

      {/* Success message */}
      {success && (
        <div style={{
          background: "rgba(16,185,129,0.08)",
          border: "1px solid rgba(16,185,129,0.2)",
          borderRadius: 8, padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <svg width="14" height="14" fill="none" stroke="#34d399" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span style={{ color: "#34d399", fontSize: 12, fontFamily: "'Inter', system-ui, sans-serif" }}>
            Idea launched successfully!
          </span>
        </div>
      )}

      {/* Author */}
      <div>
        <input
          type="text"
          placeholder="Your name *"
          value={author}
          onChange={(e) => { setAuthor(e.target.value); setErrors((p) => ({ ...p, author: "" })); }}
          style={inputStyle("author")}
          onFocus={(e) => { if (!errors.author) { e.target.style.borderColor = "rgba(124,58,237,0.45)"; e.target.style.background = "rgba(255,255,255,0.07)"; }}}
          onBlur={(e) => { if (!errors.author) { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}}
        />
        {errorMsg("author")}
      </div>

      {/* Title */}
      <div>
        <input
          type="text"
          placeholder="Idea title *"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: "" })); }}
          style={inputStyle("title")}
          onFocus={(e) => { if (!errors.title) { e.target.style.borderColor = "rgba(124,58,237,0.45)"; e.target.style.background = "rgba(255,255,255,0.07)"; }}}
          onBlur={(e) => { if (!errors.title) { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}}
        />
        {errorMsg("title")}
      </div>

      {/* Description */}
      <div>
        <textarea
          placeholder="Describe your idea * (min. 10 characters)"
          rows={3}
          value={description}
          onChange={(e) => { setDescription(e.target.value); setErrors((p) => ({ ...p, description: "" })); }}
          style={{ ...inputStyle("description"), resize: "none", lineHeight: 1.5 }}
          onFocus={(e) => { if (!errors.description) { e.target.style.borderColor = "rgba(124,58,237,0.45)"; e.target.style.background = "rgba(255,255,255,0.07)"; }}}
          onBlur={(e) => { if (!errors.description) { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}}
        />
        {errorMsg("description")}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          background: loading ? "rgba(39,39,42,0.8)" : "linear-gradient(135deg, #7c3aed, #4338ca)",
          border: "none",
          borderRadius: 11,
          padding: "13px 0",
          color: loading ? "#52525b" : "#fff",
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "'Inter', system-ui, sans-serif",
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          boxShadow: loading ? "none" : "0 4px 20px rgba(124,58,237,0.3)",
          transition: "opacity 0.15s",
          marginTop: 2,
        }}
      >
        {loading ? (
          <>
            <svg style={{ animation: "spin 0.8s linear infinite" }} width="14" height="14" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.2 }} />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" style={{ opacity: 0.7 }} />
            </svg>
            Adding...
          </>
        ) : (
          <>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Launch Idea
          </>
        )}
      </button>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        input::placeholder, textarea::placeholder { color: #3f3f46; }
      `}</style>
    </form>
  );
}

export default IdeaForm;