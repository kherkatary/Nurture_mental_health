import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom'
import { Loader} from '../../Components'
import './AllBlogs.scss'
const AllBlogs = () => {

    // const proxy= import.meta.env.VITE_PROXY
     const proxy="https://nurture-mental-health-api.onrender.com/api/v1"

    const [blogs, setBlogs] = useState()

    useEffect(()=>{
        fetchBlogs()
    },[])

    
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
    <div className="blogContainer">
    <h1 className='blogListHeading'>Articles</h1>

    <div className="blogsList">
        { (!blogs) ?  <div className='unavailable'><div className='unHead'>Articles Unavailable</div></div> : 

          blogs.map(item => (
                <div key={item?._id} className='blogCard'>
                <Link  key={item?._id} to={`/articles/${item?._id}`}>
                <di><img className='cover' src={item?.cover} alt="unavailable"/></di>
                    <h2 className='title'>{item?.title.length<100?  item?.title:item?.title.slice(0,100)+"..."}</h2>

                    <div className="author">{item?.author}</div>
                </Link>
                </div>

                 
                ))
           
        }
    </div>
    </div>
  )
}

export default AllBlogs

