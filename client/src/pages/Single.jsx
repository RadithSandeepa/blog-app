import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import Menu from '../components/Menu';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from "moment";
import DOMPurify from "dompurify";
import { AuthContext } from '../context/authContext';

const Single = () => {

  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];

  const {currentuser} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      }catch(err){
        console.log(err);
      }
    }

    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try{
      await axios.delete(`/posts/${postId}`);
      toast.success('Post deleted successfully!');
      navigate("/");
    }catch(err){
      console.log(err);
    }

  }

  return (
    <div className='single'>
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
      <div className="user">
        {post.userImg && <img src={`../upload/${post?.userImg}`} alt="" />}
      <div className="info">
        <span>{post.username}</span>
        <p>Posted {moment(post.date).fromNow()}</p>
      </div>
      {currentuser && currentuser.username === post.username &&(
      <div className="edit">
        <Link to={`/write?edit=${post.id}`} state={post}>
          <img src={Edit} alt="" />
        </Link>
        <img onClick={handleDelete} src={Delete} alt="" />
      </div>
      )}
      </div>
      <h1>{post.title}</h1>
      <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
      ></p>
      </div>
      <Menu cat={post.category}  postId={postId} isMyPosts={false}/>
    </div>
  )
}

export default Single