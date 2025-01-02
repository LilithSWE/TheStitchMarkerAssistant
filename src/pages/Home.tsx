import { Login } from "./Login";
import { Start } from "./Start";
export const Home = () => {
  const user = localStorage.getItem("sb-eqnkywknmhgrrrhprwbe-auth-token");

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
