import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/posts${cat}`);
        setPosts(res.data.result);
      } catch (error) {
        console.log(error.response.result.message);
      }
    }
    fetchData();
  }, [cat]);

  //! from element to text
  function getText(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  return (
    <div className="home">
      <div className="posts">
        {posts?.map((post) => {
          return (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={`../upload/${post.img}`} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.details)}</p>
                <button>Read More</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
