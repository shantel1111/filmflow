import { useState } from "react";
import Layout from "./components/Layout";
import Content from "./components/Content";
import Login from "./features/Login";

export default function App() {
  const [isLoggedIn, setLogin] = useState(true);

  return (
    <Layout>
      {!isLoggedIn && <Login setLogin={setLogin} />}
      {isLoggedIn && <Content />}
    </Layout>
  );
}
