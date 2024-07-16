import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {

  const state = useLocation().state;
  const navigate = useNavigate();

  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title ||'');
  const [file, setFile] = useState('');
  const [cat, setCat] = useState(state?.category ||'');

  const upload = async () => {

    try{
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/upload', formData);
     return res.data;
    }catch(err){
      console.log(err);
    }
  }

  const handleClick = async e => {
    e.preventDefault();
    let imgUrl = state?.img || ''; // Use existing image URL if available

    if (!title.trim()) {
      toast.error('Post Title is required!');
      return;
    }

    if (!value.trim()) {
      toast.error('Post Content is required!');
      return;
    }

    if (!cat.trim()) {
      toast.error('Post Category is required!');
      return;
    }

    if (file) {
      imgUrl = await upload();
    }

    if (!imgUrl) {
      toast.error('Post Image is required!');
      return;
    }

    try{
      state ? 
      await axios.put(`/posts/${state.id}`, {title, desc: value, img: imgUrl, category: cat}) 
      : 
      await axios.post('/posts', {title, desc: value, img: imgUrl, category: cat, date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')});
      navigate("/");
    }catch(err){
      console.log(err);
    }

  }

  return (
    <div className='add'>
      <div className="content">
        <input type="text" placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display:"none"}} type="file" name='' id='file' onChange={e=>setFile(e.target.files[0])}/>
          <label className='file' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save Draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === 'art'} name='cat' value="art" id='art' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === 'science'} name='cat' value="science" id='science' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="art">Science</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat === 'technology'} name='cat' value="technology" id='technology' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="art">Technology</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat === 'cinema'} name='cat' value="cinemma" id='cinema' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="art">Cinema</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat === 'design'} name='cat' value="design" id='design' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="art">Design</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat === 'food'} name='cat' value="food" id='food' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="art">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write