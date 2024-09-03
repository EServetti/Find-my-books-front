import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login";
import Register from "../../pages/register";
import Verify from "../../pages/verify";
import Home from "../../pages/home";
import BookPage from "../../pages/bookPage";

function Main() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register}/>
      <Route path="/verify/:email/:verifyCode" Component={Verify}/>
      <Route path="/book/:title" Component={BookPage}/>
    </Routes>
  );
}

export default Main;
