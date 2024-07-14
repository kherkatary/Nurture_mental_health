import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from '../../Components'
import './AllBlogs.scss'
const AllBlogs = () => {

    const navigate= useNavigate();
    // const proxy= import.meta.env.VITE_PROXY
    const proxy="https://nurture-mental-health-api.onrender.com/api/v1"

    const [blogs, setBlogs] = useState()

    useEffect(()=>{
        fetchBlogs()
    },[])

    const readBlog= (pid)=>{
        navigate(`/articles/${pid}`)
    }
    
      const fetchBlogs= async ()=>{
        try{
          const blog= await axios.post(`${proxy}/post/all-post`).then(result=>{
            setBlogs(result?.data?.posts)

          });
    
        }catch(err){
          console.log(err)
        }
      }

  if(!blogs) return <Loader/>

  return (
    <div className="allBlogsBody">
        { (!blogs) ?  <div className='unavailable'><div className='unHead'>Articles Unavailable</div></div> : 

            blogs.map(item => (
                <Link key={item?._id} to={`/articles/${item?._id}`}>
                <div key={item?._id} className='blogsCard'>

                    <h2 >{item?.title}</h2>
                    <div className="author">By {item?.author}</div>
                    <button className='readBtn' onClick={()=>readBlog(item?._id)}>Read</button>


                </div>
                </Link>
                ))
        }
    </div>
  )
}

export default AllBlogs

