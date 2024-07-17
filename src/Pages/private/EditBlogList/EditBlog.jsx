import React, { useEffect, useState } from 'react';
import { Avatar, List, Modal } from 'antd';
import axios from 'axios';
import './editBlog.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../../../Components';
import { useAuth } from '../../../Context/context';

const EditBlog = () => {
  const [blogs, setBlogs] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [blogIdToDelete, setBlogIdToDelete] = useState(null);
  const navigate = useNavigate();
  const {logout,isAuthenticated} = useAuth()
  // const proxy= import.meta.env.VITE_PROXY
  const proxy="https://nurture-mental-health-api.onrender.com/api/v1"
  if(!isAuthenticated) navigate("/login")

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const result = await axios.post(`${proxy}/post/all-post`);
      setBlogs(result?.data?.posts);
    } catch (err) {
      console.log(err);
    }
  };

  const showDeleteModal = (pid) => {
    setBlogIdToDelete(pid);
    setIsModalVisible(true);
  };

  const handleLogout= ()=>{
    logout();
    navigate("/login")
  }

  const handleDelete = async () => {
    try {
      const result = await axios.post(`${proxy}/post/delete-post`, { pid: blogIdToDelete });
      if (result) {
        fetchBlogs();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsModalVisible(false);
      setBlogIdToDelete(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setBlogIdToDelete(null);
  };

  if(!blogs) return <Loader/>

  return (
    <div className='editBlog'>
      <div className="heading">
      <h1>Blog Settings</h1>
       <span><button className='headingBtn' onClick={handleLogout}>Logout</button></span>
       <span><button className='headingBtn' style={{backgroundColor:"green"}} onClick={()=>{navigate("/articles/editor")}}>New Blog</button></span>
       </div>
      <div className="blogList">
        <List
          itemLayout="horizontal"
          dataSource={blogs}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item?.cover} />}
                title={<Link to={`/articles/${item?._id}`}>{item?.title.slice(0,80)}</Link>}
              />
              <div className="btns">
                <button
                  className='action'
                  style={{ backgroundColor: "#3D31E0" }}
                  onClick={() => navigate("/articles/editor", { state: { placeholder: item } })}
                >
                  Edit
                </button>
                <button
                  className='action'
                  style={{ backgroundColor: "#E04932" }}
                  onClick={() => showDeleteModal(item?._id)}
                >
                  Delete
                </button>
              </div>
            </List.Item>
          )}
        />
      </div>

      <Modal
        title="Confirm Delete"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this blog post?</p>
      </Modal>
    </div>
  );
};

export default EditBlog;
