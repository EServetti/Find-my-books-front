import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login";

function Home() {
  return <p>This is home</p>;
}

function Main() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/login" Component={Login} />
    </Routes>
  );
}

export default Main;
