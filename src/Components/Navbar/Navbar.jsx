import { useState } from "react";
import "./Navbar.scss"
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from '../Logo/Logo'


const Navbar = () => {
   const [visible, setVisible] = useState(false);
   
   return (
      <>
      <header>
         <Link to="/"><Logo /></Link>

         <nav className="nav-links">
            <ul className="max-width-links">
               <li><Link to="/" className="home-menu">Home</Link></li>
               <li><Link to="/teams">Team</Link></li>
               <li><Link to="/about">About Us</Link></li>
               <li><Link to="/services">Services</Link></li>
               <li><Link to="/joinus">Join Us</Link></li>
               <li><Link to="/articles">Articles</Link></li>

               {/* <li> <Link to="/news">Blogs</Link></li> */}
               {/* <li><Link to="/contact">Contact</Link></li> */}
               {/* <li><Link to="/login">Log In</Link></li> */}

            </ul>
         </nav>
         <button className="navbar-button" onClick={()=>setVisible(!visible)}><IoMenu /> Menu</button>
      </header>

         {
            visible && <div className="show-nav-links" onClick={()=>setVisible(false)}>
            <div className="div-links">
            
               <ul className="min-width-links">
               <li><Link to="/" className="home-menu">Home</Link></li>
               <li><Link to="/teams">Team</Link></li>
               <li><Link to="/about">About Us</Link></li>
               <li><Link to="/services">Services</Link></li>
               <li><Link to="/joinus">Join Us</Link></li>
               <li><Link to="/articles">Articles</Link></li>

               {/* <li> <Link to="/news">Blogs</Link></li> */}
               {/* <li><Link to="/contact">Contact</Link></li> */}
               {/* <li><Link to="/login">Log In</Link></li> */}

               </ul>
            </div>
         </div>
         }

        
      </>
   )
}

export default Navbar