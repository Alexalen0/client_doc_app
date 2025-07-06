import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [docs, setDocs] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/docs`, {
        headers: { Authorization: token },
      })
      .then((res) => setDocs(res.data));
  }, [token]);

  const createDoc = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/docs`,
      { title },
      {
        headers: { Authorization: token },
      }
    );
    setDocs([...docs, res.data]);
    setTitle("");
  };

  const deleteDoc = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/docs/${id}`, {
      headers: { Authorization: token },
    });
    setDocs(docs.filter((doc) => doc._id !== id));
  };

  return (
    <div
      className="dashboard-container"
      style={{
        background: "linear-gradient(135deg, #18120f 80%, #222 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ color: "#ffd700", margin: 0 }}>Your Documents</h2>
        <button
          onClick={logout}
          className="btn"
          style={{
            background: "#222",
            color: "#ffd700",
            border: "1px solid #ffd700",
          }}
        >
          Logout
        </button>
      </div>
      <form
        onSubmit={createDoc}
        className="card"
        style={{
          marginBottom: "2rem",
          background: "#18120f",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          boxShadow: "0 2px 16px rgba(255,215,0,0.08)",
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Document Title"
          required
          style={{ flex: 1 }}
        />
        <button
          type="submit"
          className="btn"
          style={{
            minWidth: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <span style={{ fontWeight: 700 }}>Create</span>
        </button>
      </form>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {docs.map((doc) => (
          <div
            key={doc._id}
            className="card"
            style={{
              minWidth: 220,
              background: "#222",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 16px rgba(255,215,0,0.08)",
              transition: "box-shadow 0.2s, transform 0.1s",
              position: "relative",
            }}
            onClick={() => navigate(`/edit/${doc._id}`)}
          >
            <h3
              style={{
                color: "#ffd700",
                marginBottom: 8,
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              {doc.title}
            </h3>
            <span style={{ color: "#fff8dc", fontSize: 13 }}>Open</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc._id);
              }}
              className="btn"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "#18120f",
                color: "#ffd700",
                border: "1px solid #ffd700",
                fontSize: 13,
                padding: "0.3em 0.8em",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(24, 18, 15, 0.1)",
                zIndex: 2,
              }}
              title="Delete document"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
