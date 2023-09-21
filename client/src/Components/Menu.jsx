import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/posts/?cat=${cat}`
        );
        setPosts(res.data.result);
      } catch (error) {
        console.log(error.response.result.message);
      }
    }
    fetchData();
  }, [cat]);

  return (
    <div className=" menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => {
        return (
          <div className="post" key={post.id}>
            <img src={`../upload/${post.img}`} alt="" />
            <h2>{post.title}</h2>
            <button>Read More</button>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
