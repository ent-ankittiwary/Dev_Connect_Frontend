import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar(){
  const [open, setOpen] = useState(false); // 👈 for collapse toggle
    const user = useSelector((store)=>store.user);
    return(
        <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to="/feed" className="btn btn-ghost text-xl">Dev Connect📞</Link>
  </div>
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />

    {/*This is to display the user image icon after login*/}

    {user &&(
  <div className="dropdown dropdown-end flex px-4 gap-5 item-center  ">
    <p className="mt-1">Welcome, {user.name}</p>
      <div tabIndex={0} role="button" onClick={()=>setOpen(!open)} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            src={user.photoUrl} 
            alt="user photo"/>
        </div>
      </div>
      {open &&(
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between" onClick={()=>setOpen(false)}>
             ⚧️ My Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/accepted/connections" onClick={()=>setOpen(false)}>🫂 Connections</Link></li>
        <li><Link to="/interested/connections" onClick={()=>setOpen(false)}>🫴 Incoming Requests</Link></li>
        <li><Link to="/logout" onClick={()=>setOpen(false)}>🚷 Logout</Link></li>
      </ul>
      )}
    </div>
    )}
  </div>
</div>
    )
}

export default Navbar;
