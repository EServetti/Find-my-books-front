import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login";
import Register from "../../pages/register";
import Verify from "../../pages/verify";
import Home from "../../pages/home";
import BookPage from "../../pages/bookPage";
import BookList from "../../pages/bookList";
import Community from "../../pages/community";
import Account from "../../pages/account";
import About from "../../pages/about";
import Recover from "../../pages/recover";
import Password from "../../pages/password";

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
      <Route path="/account" Component={Account}/>
      <Route path="/about" Component={About}/>
      <Route path="/recover" Component={Recover}/>
      <Route path="/password/:token" Component={Password}/>
    </Routes>
  );
}

export default Main;
