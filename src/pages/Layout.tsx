import { Outlet } from "react-router";

export const Layout = () => {
  const theme = localStorage.getItem("theme");
  const body = document.querySelector("#body");
  if (theme == "dark") {
    body?.classList.add("dark");
  } else {
    body?.classList.add("light");
  }
  return (
    <>
      <main>
        <Outlet />
      </main>

      <footer></footer>
    </>
  );
};
