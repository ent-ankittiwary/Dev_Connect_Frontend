import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Body from "./components/Body";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import Logout from "./components/Logout";
import Request from "./components/Request";
import Connection from "./components/Connection";

function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/feed" element={<Feed/>} />
            <Route path ="/logout" element={<Logout/>}/>


            <Route path="/*" element={<p>This page doesn't exist</p>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
