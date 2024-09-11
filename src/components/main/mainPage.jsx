import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login";
import Register from "../../pages/register";
import Verify from "../../pages/verify";
import Home from "../../pages/home";
import BookPage from "../../pages/bookPage";
import BookList from "../../pages/bookList";
import Community from "../../pages/community";

function Main() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register}/>
      <Route path="/verify/:email/:verifyCode" Component={Verify}/>
      <Route path="/book/:isbn" Component={BookPage}/>
      <Route path="/list" Component={BookList}/>
      <Route path="/community" Component={Community}/>
    </Routes>
  );
}

export default Main;
