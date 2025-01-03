import { useNavigate } from "react-router-dom";
import { Button } from "../components/generic/Button";
import { useEffect, useState } from "react";

export const Settings = () => {
  const navigate = useNavigate();
  const BASE_URL = "/TheStitchMarkerAssistant";
  const [lightTheme, setLightTheme] = useState(true);
  const setChangThemeBtn = () => {
    const theme = localStorage.getItem("theme");
    if (theme == "light") {
      setLightTheme(true);
    } else if (theme == "dark") {
      setLightTheme(false);
    }
  };
  useEffect(() => {
    setChangThemeBtn();
  }, []);

  const handleThemeChange = () => {
    const body = document.querySelector("#body");
    if (body?.classList.value == "light") {
      body.classList.remove("light");
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body?.classList.remove("dark");
      body?.classList.add("light");
      localStorage.setItem("theme", "light");
    }
    setChangThemeBtn();
  };
  const handleReturn = () => {
    setTimeout(() => {
      navigate(BASE_URL);
    }, 300);
  };
  const handleLogOut = () => {
    localStorage.removeItem("sb-eqnkywknmhgrrrhprwbe-auth-token");
    localStorage.removeItem("user_id");
    handleReturn();
  };

  return (
    <>
      <h2>Settings</h2>
      <div className="primaryBtnContainer">
        {lightTheme ? (
          <Button className="dark" onClick={handleThemeChange}>
            <div className="btnText">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35px"
                viewBox="0 -960 960 960"
                width="35px"
                fill="currentcolor"
              >
                <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q10 0 20.5.67 10.5.66 24.17 2-37.67 31-59.17 77.83T444-660q0 90 63 153t153 63q53 0 99.67-20.5 46.66-20.5 77.66-56.17 1.34 12.34 2 21.84.67 9.5.67 18.83 0 150-105 255T480-120Zm0-66.67q102 0 179.33-61.16Q736.67-309 760.67-395.67q-23.34 9-49.11 13.67-25.78 4.67-51.56 4.67-117.46 0-200.06-82.61-82.61-82.6-82.61-200.06 0-22.67 4.34-47.67 4.33-25 14.66-55-91.33 28.67-150.5 107-59.16 78.34-59.16 175.67 0 122 85.66 207.67Q358-186.67 480-186.67Zm-6-288Z" />
              </svg>
              <p>Dark Theme</p>
            </div>
          </Button>
        ) : (
          <Button className="light" onClick={handleThemeChange}>
            <div className="btnText">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35px"
                viewBox="0 -960 960 960"
                width="35px"
                fill="currentcolor"
              >
                <path d="M480-346.67q55.33 0 94.33-39t39-94.33q0-55.33-39-94.33t-94.33-39q-55.33 0-94.33 39t-39 94.33q0 55.33 39 94.33t94.33 39Zm0 66.67q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-446.67H40v-66.66h160v66.66Zm720 0H760v-66.66h160v66.66ZM446.67-760v-160h66.66v160h-66.66Zm0 720v-160h66.66v160h-66.66ZM260-655.33l-100.33-97 47.66-49 96 100-43.33 46Zm493.33 496-97.66-100.34 45-45.66 99.66 97.66-47 48.34Zm-98.66-541.34 97.66-99.66 49 47L702-656l-47.33-44.67ZM159.33-207.33 259-305l46.33 45.67-97.66 99.66-48.34-47.66ZM480-480Z" />
              </svg>
              <p>Light Theme</p>
            </div>
          </Button>
        )}
        <Button className="return" onClick={handleReturn}>
          <div className="btnText">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="35px"
              viewBox="0 -960 960 960"
              width="35px"
              fill="currentcolor"
            >
              <path d="M359.33-240 120-479.33l239.33-239.34 47.34 47.34L247.33-512h526v-168H840v234H248l158.67 158.67L359.33-240Z" />
            </svg>
            <p>Return</p>
          </div>
        </Button>
        <Button className="return" onClick={handleLogOut}>
          <div className="btnText">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="35px"
              viewBox="0 -960 960 960"
              width="35px"
              fill="currentcolor"
            >
              <path d="M186.67-120q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h292.66v66.67H186.67v586.66h292.66V-120H186.67Zm470.66-176.67-47-48 102-102H360v-66.66h351l-102-102 47-48 184 184-182.67 182.66Z" />
            </svg>
            <p>Log Out</p>
          </div>
        </Button>
      </div>
    </>
  );
};
