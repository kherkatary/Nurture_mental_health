import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import './Blog.scss'; 
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../../Components';

const Blog = () => {
  const { pid } = useParams();
  const [blog, setBlog] = useState(null);
  const [date, setDate] = useState('');
  const [otherBlogs, setOtherBlogs] = useState([]);
  // const proxy= import.meta.env.VITE_PROXY
  const proxy="https://nurture-mental-health-api.onrender.com/api/v1"

  useEffect(() => {
    fetchBlog();
    fetchOtherBlog(5);
  }, [pid]);


  const fetchBlog = async () => {
    try {
      const { data } = await axios.post(`${proxy}/post/get-post`, { pid });

      if (data) {
        setBlog(data.post);
        setDate(formatCreatedAt(data.post.createdAt));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOtherBlog = async (limit) => {
    try {
      const { data } = await axios.post(`${proxy}/post/all-post`, { limit });

      if (data) {
        setOtherBlogs(data.posts.filter((post) => post._id !== pid));
      }
    } catch (err) {
      console.log("something went wrong")
      console.log(err);
    }
  };

  const formatCreatedAt = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if(!blog) return <Loader/>
  
  return (
    <main className="container">
    <header className="header">
      <h1 className="headingMain">{blog?.title}</h1>
      <p className="subheadingMain">{blog?.author} <span className='blogDate'>,{date}</span></p>
    </header>
    <section className="content">
    <img src={blog?.cover} className='poster-image' />
      <div className="BlogContent">{ReactHtmlParser(blog?.content)}</div>
    </section>
    <aside className="aside">
      <h4 className="headingAside">Other Articles you might Enjoy</h4>
      {otherBlogs.length > 0 ? (
        otherBlogs.map((item) => (
          <Link key={item?._id} to={`/articles/${item?._id}`}>
            <div className="card">
              <img
                src={item?.cover}
                alt="image"
              />
              <div>
                <p className="heading title">{item?.title}</p>
                <p className="author">{item?.author}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <><h2>Other Articles</h2></>
      )}
    </aside>
  </main>
  )

  
}

export default Blog;
