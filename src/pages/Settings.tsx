import { useNavigate } from "react-router-dom";
import { Button } from "../components/generic/Button";
import { useEffect, useState } from "react";
import { NavButtonProps } from "../models/NavButtonProps";
import { Nav } from "../components/generic/Nav";
import { HeaderSmall } from "../components/singular/HeaderSmall";
import supabaseClient from "../services/supabaseClient";

export const Settings = () => {
  const navigate = useNavigate();
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
    const primaryBtnContainer = document.getElementById("primaryBtnContainer");
    primaryBtnContainer?.classList.add("fadeOut");
    setTimeout(() => {
      primaryBtnContainer?.classList.remove("fadeOut");
      primaryBtnContainer?.classList.add("fadeIn");
    }, 100);
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

  const submitLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    console.log(error);
  };

  const handleLogOut = () => {
    submitLogout();
    localStorage.removeItem("sb-eqnkywknmhgrrrhprwbe-auth-token");
    localStorage.removeItem("user_id");
    handleToHome();
  };
  const handleToRowCounter = () => {
    setTimeout(() => {
      navigate("/rowcounter");
    }, 300);
  };
  const handleToHome = () => {
    setTimeout(() => {
      navigate("/");
    }, 300);
  };
  const handleToPatterns = () => {
    setTimeout(() => {
      navigate("/patterns");
    }, 300);
  };
  const navButtons: NavButtonProps[] = [
    {
      onClick: handleToRowCounter,
      children: (
        <div className="navBtnText">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35px"
            viewBox="0 -960 960 960"
            width="35px"
            fill="currentcolor"
          >
            <path d="M316-232h53.33v-85.33h85.34v-53.34h-85.34V-456H316v85.33h-85.33v53.34H316V-232Zm210-33.33h200.67V-318H526v52.67ZM526-370h200.67v-53.33H526V-370Zm39.33-159.33 59.34-59.34L684-529.33l38-38-59.33-60L722-686.67l-38-38-59.33 59.34-59.34-59.34-38 38 59.34 59.34-59.34 60 38 38ZM244-600.67h197.33V-654H244v53.33ZM186.67-120q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h586.66q27 0 46.84 19.83Q840-800.33 840-773.33v586.66q0 27-19.83 46.84Q800.33-120 773.33-120H186.67Zm0-66.67h586.66v-586.66H186.67v586.66Zm0-586.66v586.66-586.66Z" />
          </svg>
          <p>Continue</p>
        </div>
      ),
    },
    {
      onClick: handleToHome,
      children: (
        <div className="navBtnText">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35px"
            viewBox="0 -960 960 960"
            width="35px"
            fill="currentcolor"
          >
            <path d="M226.67-186.67h140v-246.66h226.66v246.66h140v-380L480-756.67l-253.33 190v380ZM160-120v-480l320-240 320 240v480H526.67v-246.67h-93.34V-120H160Zm320-352Z" />
          </svg>
          <p>Home</p>
        </div>
      ),
    },
    {
      onClick: handleToPatterns,
      children: (
        <div className="navBtnText">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35px"
            viewBox="0 -960 960 960"
            width="35px"
            fill="currentcolor"
          >
            <path d="M293.33-80q-55.23 0-94.28-39.05Q160-158.1 160-213.33v-533.34q0-55.23 39.05-94.28Q238.1-880 293.33-880H800v600q-25.67 0-42.83 19.83Q740-240.33 740-213.33q0 27 17.17 46.83 17.16 19.83 42.83 19.83V-80H293.33Zm-66.66-249q14.66-9 31.33-13.33 16.67-4.34 35.33-4.34H320v-466.66h-26.67q-27.77 0-47.22 19.44-19.44 19.45-19.44 47.22V-329Zm160-17.67h346.66v-466.66H386.67v466.66Zm-160 17.67v-484.33V-329Zm66.36 182.33h397.3q-8-14.66-12.5-31.5-4.5-16.83-4.5-35.16 0-18.67 4.34-35.34Q682-265.33 691-280H293.07q-27.74 0-47.07 19.44-19.33 19.45-19.33 47.23 0 28 19.33 47.33t47.03 19.33Z" />
          </svg>
          <p>Patterns</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <HeaderSmall bgColor="secondary" />
      <section className="secondView">
        <h2>Settings</h2>
        <div className="primaryBtnContainer" id="primaryBtnContainer">
          {lightTheme ? (
            <Button bgColor="dark" onClick={handleThemeChange}>
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
            <Button bgColor="light" onClick={handleThemeChange}>
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
          <Button bgColor="return" onClick={handleLogOut}>
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
      </section>

      <Nav bgColor="secondary" buttons={navButtons} />
    </>
  );
};
