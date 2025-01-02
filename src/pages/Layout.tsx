import { Outlet } from "react-router";

export const Layout = () => {
  const theme = localStorage.getItem("theme");
  const body = document.querySelector("#body");
  if (theme == "light") {
    body?.classList.remove("light");
    body?.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    body?.classList.remove("dark");
    body?.classList.add("light");
    localStorage.setItem("theme", "light");
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
