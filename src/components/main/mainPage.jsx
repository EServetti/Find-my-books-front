import { Route, Routes } from "react-router-dom";

function Home() {
  return <p>This is home</p>;
}

function Main() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
    </Routes>
  );
}

export default Main;
