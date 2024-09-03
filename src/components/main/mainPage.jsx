import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login";
import Register from "../../pages/register";
import Verify from "../../pages/verify";
import Home from "../../pages/home";

function Main() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register}/>
      <Route path="/verify/:email/:verifyCode" Component={Verify}/>
    </Routes>
  );
}

export default Main;
