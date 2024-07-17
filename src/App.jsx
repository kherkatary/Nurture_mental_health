import { Footer, Navbar } from './Components'
import { About, ErrorPage, Home, Login, News, Contact, Teams, Register, Service,JoinUs, Blog, BlogEditor, AllBlogs } from './Pages/index'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Context/context'
import './App.css'
import EditBlog from './Pages/private/EditBlogList/EditBlog'
import { getAnalytics, logEvent } from "firebase/analytics";
import Private from './Pages/private/Private'


function App() {

  const analytics = getAnalytics();
  logEvent(analytics, 'notification_received');

  return (
    <>
      <AuthProvider>
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
        <Route path='/articles' element={<AllBlogs/>}/>
        {/* .......................private routes ..........................*/}
        <Route path='/articles/editor' element={<Private>
          <BlogEditor />
        </Private>}/>
        <Route path='/articles/edit-articles' element={<Private>
          <EditBlog />
        </Private>}/>

      </Routes>
      <Footer />
      </AuthProvider>
    </>
  )
}

export default App
