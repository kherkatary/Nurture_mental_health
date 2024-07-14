import { useState, useRef, useMemo, useEffect } from "react";
import axios from "axios";
import "./BlogEditor.scss";
import JoditEditor from 'jodit-react';
import {useLocation, useNavigate } from "react-router-dom";

const BlogEditor = () => {
  // const proxy= import.meta.env.VITE_PROXY
  const proxy="https://nurture-mental-health-api.onrender.com/api/v1"
  const navigate=useNavigate()
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [bTitle, setBTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [cover, setCover] = useState('');
  const location = useLocation();
  const { placeholder = {} } = location.state || {};

  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  useEffect(() => {
    if (!isEmptyObject(placeholder)) {
      setContent(placeholder.content || '');
      setAuthor(placeholder.author || '');
      setCover(placeholder.cover || '');
      setBTitle(placeholder.title || '');
    }
  }, [placeholder]);

  const addBlog = async () => {
    try {
      const newPost = await axios.post(`${proxy}/post/new-post`, {
        title: bTitle,
        content: content,
        author: author,
        cover: cover
      });

      if (newPost) {
        alert("Post Created");
        navigate(`/articles/${newPost?.data?.pid}`)
      } else {
        alert("Error Creating");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const edit = async () => {
    try {
      const editedBlog = await axios.post(`${proxy}/post/edit-post`, {
        title: bTitle,
        content: content,
        author: author,
        cover: cover,
        pid: placeholder?._id
      });

      if (editedBlog) {
        alert("Success");
        if(editedBlog?.data?.pid) navigate(`/articles/${editedBlog?.data?.pid}`)
      }
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  };

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder?.content || 'Start typing...',
      height: '70vh',
      toolbarAdaptive: true
    }),
    [placeholder.content]
  );

  return (
    <div className="EditorContainer">
      <div className="JDE">
        <div className="postBtn centerEle">
          {!isEmptyObject(placeholder) ? 
            <button className="pb" onClick={edit}>EDIT</button> : 
            <button className="pb" onClick={addBlog}>POST</button>}
        </div>
        <input
          required
          className="author"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          required
          className="author"
          style={{ margin: "1rem", width: "90%" }}
          placeholder="Cover Image Link"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
        <div className="title">
          <textarea
            required
            value={bTitle}
            onChange={(e) => setBTitle(e.target.value)}
            className="titleInput"
            rows="1"
            placeholder="Title"
          />
        </div>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => setContent(newContent)}
        />
      </div>
    </div>
  );
}

export default BlogEditor;
