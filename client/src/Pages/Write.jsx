import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

const Write = () => {
  const location = useLocation();
  const { state } = location;

  const navigate = useNavigate();

  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.details || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  //! uploading image
  async function upload() {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/upload",
        formData
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePublish(e) {
    e.preventDefault();

    //! to upload imgs inside server
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`http://127.0.0.1:8000/api/posts/${state.id}`, {
            title,
            details: value,
            cat,
            img: file ? imgUrl : "",
            token: window.localStorage.getItem("token"),
          })
        : await axios.post(`http://127.0.0.1:8000/api/posts`, {
            title,
            details: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            token: window.localStorage.getItem("token"),
          });
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      toast.success("Posted successfully");
    }
  }
  const category = ["art", "science", "technology", "cinema", "design", "food"];

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input
            style={{ display: "none " }}
            type="file"
            name=""
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file " htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as draft </button>
            <button onClick={handlePublish}> Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {category.map((el, index) => (
            <Category
              el={el}
              state={state}
              key={index}
              cat={cat}
              setCat={setCat}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function Category({ state, el, cat, setCat }) {
  return (
    <div className="cat">
      <input
        type="radio"
        checked={cat === el}
        name="cat"
        value={el}
        id={el}
        onChange={(e) => setCat(e.target.value)}
      />
      <label htmlFor={el}>{el.split("")[0].toUpperCase() + el.slice(1)}</label>
    </div>
  );
}

export default Write;
