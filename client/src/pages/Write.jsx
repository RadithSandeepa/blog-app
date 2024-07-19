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
  const [loading, setLoading] = useState(false);
  
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
        } catch (err) {
          console.log(err);
        }
      };

      fetchDraft();
    }

  }, [state, currentuser.id]);

  const countCharacters = (text) => {
    return text.length;
  };

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

  const handleSaveDraft = async () => {
    try {
      const draftData = {
        title,
        desc: value,
        img: file ? await upload() : imgUrl,
        category: cat,
      };

      if (draftId) {
        await axios.put(`/drafts/${draftId}`, draftData);
      } else {
        await axios.post('/drafts/', draftData);
      }
      toast.success('Draft saved!');
    } catch (err) {
      console.log(err);
    }

  }

  const handleClick = async e => {
    e.preventDefault();
    setLoading(true);
   
    if (!title.trim()) {
      toast.error('Post Title is required!');
      setLoading(false);
      return;
    }

    if (countCharacters(title) > 60) {
      toast.error('Post Title exceeds the maximum length!');
      setLoading(false);
      return;
    }


    if (!value.trim()) {
      toast.error('Post Content is required!');
      setLoading(false);
      return;
    }

    if (countCharacters(value) > 4000) {
      toast.error('Post Content exceeds the maximum length!');
      setLoading(false);
      return;
    }

    if (!cat.trim()) {
      toast.error('Post Category is required!');
      setLoading(false);
      return;
    }

    let img = state ? state.img : '';

    if(draftId){
      img = imgUrl || '';
    }

    if (file) {
      img= await upload();
    }

    if (!img) { 
      toast.error('Post Image is required!');
      setLoading(false);
      return;
    }

    if(loading) return <div>Loading...</div>;

    try{
      if (draftId) {
        await axios.delete(`/drafts/${draftId}`);
      }

      const postData = { title, desc: value, img, category: cat, date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') };

      if (state) {
        await axios.put(`/posts/${state.id}`, postData);
        toast.success("Post updated!");
        navigate("/");
      } else {
        await axios.post('/posts', postData);
        toast.success("Post published!");
        navigate("/");
      }
    }catch(err){
      if (err.response.status === 400) {
        toast.error(err.response.data);
      }else{
        console.log(err);
      }
    }finally{
      setLoading(false);
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

export default Write;