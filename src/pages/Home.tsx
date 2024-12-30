import { Login } from "./Login";
import { Start } from "./Start";
export const Home = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return (
      <>
        <Start />
      </>
    );
  } else {
    return (
      <>
        <Login />
      </>
    );
  }
};
