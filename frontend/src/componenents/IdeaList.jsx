import { useState } from "react";
import axios from "axios";

function IdeaList({ ideas, fetchIdeas }) {
  const [deletingId, setDeletingId] = useState(null);
  const [upvotingId, setUpvotingId] = useState(null);
  const [openComments, setOpenComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [addingComment, setAddingComment] = useState({});
  const API = "http://localhost:5000/api/ideas";

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`${API}/${id}`);
      fetchIdeas();
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpvote = async (id) => {
    setUpvotingId(id);
    try {
      await axios.put(`${API}/${id}/upvote`);
      fetchIdeas();
    } finally {
      setUpvotingId(null);
    }
  };

  const toggleComments = (id) => {
    setOpenComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddComment = async (id) => {
    const text = commentText[id]?.trim();
    if (!text) return;
    setAddingComment((prev) => ({ ...prev, [id]: true }));
    try {
      await axios.post(`${API}/${id}/comments`, { text, author: "Kashif" });
      setCommentText((prev) => ({ ...prev, [id]: "" }));
      fetchIdeas();
    } finally {
      setAddingComment((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (ideas.length === 0) {
    return (
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "56px 0", gap: 12,
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="20" height="20" fill="none" stroke="#3f3f46" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <span style={{
          color: "#3f3f46", fontSize: 13, fontWeight: 500,
          fontFamily: "'Inter', system-ui, sans-serif",
        }}>
          No ideas yet. Be the first.
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {ideas.map((idea, index) => {
        const isOpen = openComments[idea._id];
        const comments = idea.comments || [];

        return (
          <div
            key={idea._id}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              overflow: "hidden",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
          >
            {/* Main row */}
            <div style={{ padding: "14px 16px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>

              {/* Number badge */}
              <div style={{
                width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#a78bfa", fontSize: 11, fontWeight: 700,
                fontFamily: "'Inter', system-ui, sans-serif",
                marginTop: 1,
              }}>
                {index + 1}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  color: "#fafafa", fontSize: 14, fontWeight: 600,
                  fontFamily: "'Inter', system-ui, sans-serif",
                  marginBottom: 3,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {idea.title}
                </div>

                {idea.description && (
                  <div style={{
                    color: "#52525b", fontSize: 12, lineHeight: 1.55,
                    fontFamily: "'Inter', system-ui, sans-serif",
                    marginBottom: 8,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>
                    {idea.description}
                  </div>
                )}

                {/* Meta */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#3f3f46", fontSize: 11, fontFamily: "'Inter', system-ui, sans-serif" }}>
                    by {idea.author || "Anonymous"}
                  </span>
                  <span style={{ width: 2, height: 2, borderRadius: "50%", background: "#3f3f46", display: "inline-block" }} />
                  <span style={{ color: "#3f3f46", fontSize: 11, fontFamily: "'Inter', system-ui, sans-serif" }}>
                    {idea.upvotes} {idea.upvotes === 1 ? "vote" : "votes"}
                  </span>
                  <span style={{ width: 2, height: 2, borderRadius: "50%", background: "#3f3f46", display: "inline-block" }} />
                  {/* Comments toggle */}
                  <button
                    onClick={() => toggleComments(idea._id)}
                    style={{
                      background: "none", border: "none", padding: 0,
                      color: isOpen ? "#a78bfa" : "#3f3f46",
                      fontSize: 11, fontWeight: 600,
                      fontFamily: "'Inter', system-ui, sans-serif",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                      transition: "color 0.15s",
                    }}
                  >
                    <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {comments.length} {comments.length === 1 ? "comment" : "comments"}
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>

                {/* Upvote */}
                <button
                  onClick={() => handleUpvote(idea._id)}
                  disabled={upvotingId === idea._id}
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    borderRadius: 8, padding: "6px 10px",
                    color: "#34d399", fontSize: 12, fontWeight: 700,
                    fontFamily: "'Inter', system-ui, sans-serif",
                    cursor: upvotingId === idea._id ? "not-allowed" : "pointer",
                    opacity: upvotingId === idea._id ? 0.5 : 1,
                    transition: "background 0.15s, border-color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (upvotingId !== idea._id) {
                      e.currentTarget.style.background = "rgba(16,185,129,0.18)";
                      e.currentTarget.style.borderColor = "rgba(16,185,129,0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(16,185,129,0.1)";
                    e.currentTarget.style.borderColor = "rgba(16,185,129,0.2)";
                  }}
                >
                  {upvotingId === idea._id ? (
                    <svg style={{ animation: "spin 0.8s linear infinite" }} width="12" height="12" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.2 }} />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" style={{ opacity: 0.7 }} />
                    </svg>
                  ) : (
                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                    </svg>
                  )}
                  {idea.upvotes}
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(idea._id)}
                  disabled={deletingId === idea._id}
                  style={{
                    width: 32, height: 32,
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#3f3f46",
                    cursor: deletingId === idea._id ? "not-allowed" : "pointer",
                    opacity: deletingId === idea._id ? 0.5 : 1,
                    transition: "background 0.15s, border-color 0.15s, color 0.15s",
                    padding: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (deletingId !== idea._id) {
                      e.currentTarget.style.background = "rgba(239,68,68,0.1)";
                      e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
                      e.currentTarget.style.color = "#f87171";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "#3f3f46";
                  }}
                >
                  {deletingId === idea._id ? (
                    <svg style={{ animation: "spin 0.8s linear infinite" }} width="13" height="13" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.2 }} />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" style={{ opacity: 0.7 }} />
                    </svg>
                  ) : (
                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Comments section */}
            {isOpen && (
              <div style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(0,0,0,0.15)",
                padding: "14px 16px",
              }}>

                {/* Existing comments */}
                {comments.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
                    {comments.map((c, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        {/* Avatar */}
                        <div style={{
                          width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                          background: "rgba(124,58,237,0.2)",
                          border: "1px solid rgba(124,58,237,0.25)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#a78bfa", fontSize: 10, fontWeight: 700,
                          fontFamily: "'Inter', system-ui, sans-serif",
                        }}>
                          {(c.author || "A")[0].toUpperCase()}
                        </div>
                        <div>
                          <span style={{
                            color: "#71717a", fontSize: 11, fontWeight: 600,
                            fontFamily: "'Inter', system-ui, sans-serif",
                            marginRight: 6,
                          }}>
                            {c.author || "Anonymous"}
                          </span>
                          <span style={{
                            color: "#a1a1aa", fontSize: 12,
                            fontFamily: "'Inter', system-ui, sans-serif",
                            lineHeight: 1.5,
                          }}>
                            {c.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{
                    color: "#3f3f46", fontSize: 12,
                    fontFamily: "'Inter', system-ui, sans-serif",
                    margin: "0 0 12px", textAlign: "center",
                  }}>
                    No comments yet. Start the discussion!
                  </p>
                )}

                {/* Add comment input */}
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText[idea._id] || ""}
                    onChange={(e) => setCommentText((prev) => ({ ...prev, [idea._id]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === "Enter") handleAddComment(idea._id); }}
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: 8, padding: "8px 12px",
                      color: "#fafafa", fontSize: 12,
                      fontFamily: "'Inter', system-ui, sans-serif",
                      outline: "none", boxSizing: "border-box",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(124,58,237,0.45)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; }}
                  />
                  <button
                    onClick={() => handleAddComment(idea._id)}
                    disabled={addingComment[idea._id] || !commentText[idea._id]?.trim()}
                    style={{
                      background: addingComment[idea._id] || !commentText[idea._id]?.trim()
                        ? "rgba(39,39,42,0.8)"
                        : "rgba(124,58,237,0.8)",
                      border: "1px solid rgba(124,58,237,0.3)",
                      borderRadius: 8, padding: "8px 14px",
                      color: addingComment[idea._id] || !commentText[idea._id]?.trim() ? "#52525b" : "#fff",
                      fontSize: 12, fontWeight: 600,
                      fontFamily: "'Inter', system-ui, sans-serif",
                      cursor: addingComment[idea._id] || !commentText[idea._id]?.trim() ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", gap: 5,
                      transition: "background 0.15s",
                      flexShrink: 0,
                    }}
                  >
                    {addingComment[idea._id] ? (
                      <svg style={{ animation: "spin 0.8s linear infinite" }} width="12" height="12" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.2 }} />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" style={{ opacity: 0.7 }} />
                      </svg>
                    ) : (
                      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        input::placeholder { color: #3f3f46; }
      `}</style>
    </div>
  );
}

export default IdeaList;