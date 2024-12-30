import { Outlet } from "react-router";
import { Header } from "../components/singular/Header";

export const Layout = () => {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet />
      </main>

      <footer></footer>
    </>
  );
};
