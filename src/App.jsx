import { Footer, Navbar } from './Components'
import { About, ErrorPage, Home, Login, News, Contact, Teams, Register, Service,JoinUs, Blog, BlogEditor, AllBlogs } from './Pages/index'
import { Routes, Route } from 'react-router-dom'
import {BlogPost} from "./Context/context"
import './App.css'
import { useState } from 'react'
import EditBlog from './Pages/private/EditBlogList/EditBlog'


function App() {

  const [blog,setBlog]=useState("blog unfetched")

  return (
    <>
      <BlogPost.Provider value={{blog,setBlog}}>
    <div className='navbar_box'>

      <Navbar  />
    </div>
      <Routes>

        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route exact path='/login' element={<Login />} />
        {/* <Route path='/pages' element={<Login/>}/> */}
        {/* <Route path='/aboutus' element={<Login/>}/> */}
        {/* <Route path='/services' element={<Login/>}/> */}
        <Route exact path='/news' element={<News />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />

        <Route path='*' element={<ErrorPage />} />
        <Route path='/services' element={<Service />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/joinus' element={<JoinUs />} />
        <Route path='/articles/:pid' element={<Blog/>}/>
        <Route path='/articles/editor' element={<BlogEditor/>}/>
        <Route path='/articles' element={<AllBlogs/>}/>
        {/* .......................private routes ..........................*/}
        <Route path='/articles/edit-article' element={<EditBlog/>}/>

      </Routes>
      <Footer />
      </BlogPost.Provider>
    </>
  )
}

export default App
