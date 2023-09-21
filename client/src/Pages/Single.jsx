import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Delete from "../img/delete.png";
import Edit from "../img/edit.png";
import Menu from "../Components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../Context/authContext";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

const Single = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState({});

  const { id: postID } = useParams();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/posts/${postID}`
        );
        setPost(res.data.result[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [postID]);

  async function handleDelete() {
    try {
      const data = JSON.stringify({
        postID,
        token: window.localStorage.getItem("token"),
      });
      await axios.delete(`http://127.0.0.1:8000/api/posts/${data}`);
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  function getText(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="imageof gg" />
        <div className="user">
          <img src={post?.userImg} alt="" />
          <div className="info">
            {post.username && (
              <span>
                {post.username[0].toUpperCase() + post.username.slice(1)}
              </span>
            )}
            <p>Posted {moment(new Date("13 sep 2023")).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={"/write?edit=2"} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.details),
          }}
        ></p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
