import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const Body =()=>{
    return(
        <div>
            <Navbar/>
            <Outlet/>  {/*This will render child routes of body always below the navbar*/}
            <Footer/>
        </div>
    )
}

export default Body;