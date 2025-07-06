import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../styles/editor.css";

function Editor() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [doc, setDoc] = useState(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/docs/${id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setDoc(res.data);
        setContent(res.data.content);
      });
  }, [id, token]);

  const save = async () => {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/api/docs/${id}`,
      { content },
      {
        headers: { Authorization: token },
      }
    );
    alert("Saved!");
  };

  if (!doc) return <div>Loading...</div>;

  return (
    <div
      className="editor-container card"
      style={{
        maxWidth: 900,
        margin: "2rem auto",
        background: "linear-gradient(135deg, #18120f 80%, #222 100%)",
      }}
    >
      <h2 style={{ color: "#ffd700", marginBottom: "1.5rem" }}>{doc.title}</h2>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        style={{
          background: "#222",
          color: "#ffd700",
          borderRadius: 8,
          marginBottom: 24,
        }}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        }}
      />
      <button
        onClick={save}
        className="btn"
        style={{ width: 120, marginTop: 8 }}
      >
        Save
      </button>
      <button
        onClick={() => navigate("/dashboard")}
        className="btn"
        style={{
          background: "#222",
          color: "#ffd700",
          border: "1px solid #ffd700",
          marginLeft: 16,
        }}
      >
        Back
      </button>
    </div>
  );
}

export default Editor;
