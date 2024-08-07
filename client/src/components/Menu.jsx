import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Menu = ({cat, postId, isMyPosts}) => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        let res;
        let filteredPosts;
        if (isMyPosts) {
          res = await axios.get("/posts/myposts");
          filteredPosts = res.data;
        } else {
          res = await axios.get(`/posts/?cat=${cat}`);
          filteredPosts = res.data.filter(post => post.id !== parseInt(postId)).slice(0, 5);
        }
        setPosts(filteredPosts);
      }catch(err){
        console.log(err);
      }
    }

    fetchData();
  }, [cat]);


  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];


  return (
    <div className='menu'>
      <h1>{isMyPosts ? "My Posts" : "Other posts you may like"}</h1>
      {posts.length === 0 ? (
        <p className='msg'>No posts available.</p>
      ) : (
      posts.map(post => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post?.img}`} alt="" />
          <h2 title={post.title}>{post.title}</h2>
          <Link to={`/post/${post.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      
      )))}
    </div>
  )
}

export default Menu