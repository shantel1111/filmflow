import { useState } from "react";
import Layout from "./components/Layout";
import Content from "./components/Content";
import Login from "./features/Login";

export default function App() {
  const [isLoggedIn, setLogIn] = useState(false);

  return (
    <Layout>
      {!isLoggedIn && <Login />}
      {isLoggedIn && <Content />}
    </Layout>
  );
}
