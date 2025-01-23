import { useEffect, useState } from "react";
import { SessionKey } from "../models/SessionKey";
import supabaseClient from "../services/supabaseClient";
import { Login } from "./Login";
import { Start } from "./Start";
import { Headline } from "../components/singular/Headline";

export const Home = () => {
  const [activeSession, setActiveSession] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("sb-eqnkywknmhgrrrhprwbe-auth-token");
    if (session) {
      const sessionParsed = JSON.parse(session) as SessionKey;
      const startSession = async () => {
        if (sessionParsed) {
          // Log in / start a session with the access_token in the url from the "reset your password"
          const { data, error } = await supabaseClient.auth.setSession({
            access_token: sessionParsed.access_token,
            refresh_token: sessionParsed.refresh_token,
          });
          if (error) {
            if (error.message.includes("refresh token expired")) {
              console.error("Error: Refresh token has expired.");
            } else {
              console.error("Error setting session:", error);
            }
            localStorage.removeItem("sb-eqnkywknmhgrrrhprwbe-auth-token");
            localStorage.removeItem("user_id");
          } else {
            console.log("Successfull in setting session:", data);
            localStorage.setItem("user_id", sessionParsed.user.id);
            setActiveSession(true);
          }
        } else {
          console.log("Can't find access_token data");
          localStorage.removeItem("sb-eqnkywknmhgrrrhprwbe-auth-token");
          localStorage.removeItem("user_id");
          return;
        }
        setHasRun(true);
      };
      startSession();
    } else {
      setHasRun(true);
    }
  }, []);

  return (
    <>
      {hasRun ? (
        <>
          {activeSession ? (
            <>
              <Start />
            </>
          ) : (
            <>
              <Login />
            </>
          )}
        </>
      ) : (
        <>
          <section className="firstView">
            <Headline />
          </section>
        </>
      )}
    </>
  );
};
