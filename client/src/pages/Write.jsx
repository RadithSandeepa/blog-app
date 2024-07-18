import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Write = () => {

  const {currentuser} = useContext(AuthContext);
  const state = useLocation().state;
  const navigate = useNavigate();

  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title ||'');
  const [file, setFile] = useState('');
  const [cat, setCat] = useState(state?.category ||'');
  const [imgUrl, setImgUrl] = useState(state?.img || '');
  const [draftId, setDraftId] = useState('');
  
  useEffect(() => {
    if (!state) {
      const fetchDraft = async () => {
        try {
          const res = await axios.get(`/drafts/${currentuser.id}`);
          const draft = res.data;
          if (draft) {
            setTitle(draft.title || '');
            setValue(draft.desc || '');
            setImgUrl(draft.img || '');
            setCat(draft.category || '');
            setDraftId(draft.id);
          }
          console.log("Draft:", draft)
        } catch (err) {
          console.log(err);
        }
      };

      fetchDraft();
    }

  }, [state, currentuser.id]);

  useEffect(() => {
    console.log('Image URL updated:', imgUrl);
  }, [imgUrl]);

  const upload = async () => {

    try{
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/upload', formData);
      console.log('Image uploaded:', res.data);
     return res.data;
    }catch(err){
      console.log(err);
    }
  }

  const handleSaveDraft = async () => {
    try {
      const draftData = {
        title,
        desc: value,
        img: file ? await upload() : imgUrl,
        category: cat,
      };
      console.log('Draft data to save:', draftData);

      if (draftId) {
        await axios.put(`/drafts/${draftId}`, draftData);
        console.log('Draft updated:', draftData);
      } else {
        await axios.post('/drafts/', draftData);
        console.log('Draft added:', draftData);
      }
      toast.success('Draft saved!');
    } catch (err) {
      console.log(err);
    }

  }

  const handleClick = async e => {
    e.preventDefault();
   
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

    let img = state ? state.img : '';

    if (file) {
      img= await upload();
      console.log(`Image uploaded: ${img}`);
      console.log('Image existing:', imgUrl);
    }

    if (!img) { 
      toast.error('Post Image is required!');
      return;
    }

    try{
      if (draftId) {
        await axios.delete(`/drafts/${draftId}`);
        console.log('Draft deleted:', draftId);
      }

      const postData = { title, desc: value, img, category: cat, date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') };
      console.log('Post data to publish:', postData);

      if (state) {
        await axios.put(`/posts/${state.id}`, postData);
        console.log('Post updated:', postData);
        toast.success("Post updated!");
        navigate("/");
      } else {
        await axios.post('/posts', postData);
        console.log('Post added:', postData);
        toast.success("Post published!");
        navigate("/");
      }
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
            <b>Status: </b> {state ? 'Published' : 'Draft'}
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display:"none"}} type="file" name='' id='file' onChange={e=>setFile(e.target.files[0])}/>
          <label className='file' htmlFor="file">Upload Image</label>
          <div className={state ? 'button' : 'buttons'}>
            {!state && <button onClick={handleSaveDraft}>Save Draft</button>}
            <button onClick={handleClick}>{state ? 'Edit' : 'Publish'}</button>
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
          <input type="radio" checked={cat === 'cinema'} name='cat' value="cinema" id='cinema' onChange={e=>setCat(e.target.value)}/>
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