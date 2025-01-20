import { useEffect, useState } from "react";
import { Button } from "../components/generic/Button";
import { Headline } from "../components/singular/Headline";
import { useNavigate } from "react-router-dom";

export const Start = () => {
  const navigate = useNavigate();
  const [hasProjectStarted, setHasProjectStarted] = useState(false);

  useEffect(() => {
    const project = localStorage.getItem("currentPiece");
    if (project) {
      setHasProjectStarted(true);
    }
  }, []);

  const handleToRowcounter = () => {
    setTimeout(() => {
      navigate("/rowcounter");
    }, 300);
  };
  const handleToPatterns = () => {
    setTimeout(() => {
      navigate("/patterns");
    }, 300);
  };
  const handleToSettings = () => {
    setTimeout(() => {
      navigate("/settings");
    }, 300);
  };

  return (
    <>
      <section className="firstView">
        <Headline />
        <div className="primaryBtnContainer">
          {hasProjectStarted ? (
            <Button bgColor="tetriary" onClick={handleToRowcounter}>
              <div className="btnText">
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
            </Button>
          ) : (
            <Button bgColor="tetriary" onClick={handleToRowcounter}>
              <div className="btnText">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="35px"
                  viewBox="0 -960 960 960"
                  width="35px"
                  fill="currentcolor"
                >
                  <path d="M316-232h53.33v-85.33h85.34v-53.34h-85.34V-456H316v85.33h-85.33v53.34H316V-232Zm210-33.33h200.67V-318H526v52.67ZM526-370h200.67v-53.33H526V-370Zm39.33-159.33 59.34-59.34L684-529.33l38-38-59.33-60L722-686.67l-38-38-59.33 59.34-59.34-59.34-38 38 59.34 59.34-59.34 60 38 38ZM244-600.67h197.33V-654H244v53.33ZM186.67-120q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h586.66q27 0 46.84 19.83Q840-800.33 840-773.33v586.66q0 27-19.83 46.84Q800.33-120 773.33-120H186.67Zm0-66.67h586.66v-586.66H186.67v586.66Zm0-586.66v586.66-586.66Z" />
                </svg>
                <p>Rowcounter</p>
              </div>
            </Button>
          )}
          <Button bgColor="primary" onClick={handleToPatterns}>
            <div className="btnText">
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
          </Button>
          <Button bgColor="secondary" onClick={handleToSettings}>
            <div className="btnText">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35px"
                viewBox="0 -960 960 960"
                width="35px"
                fill="currentcolor"
              >
                <path d="m382-80-18.67-126.67q-17-6.33-34.83-16.66-17.83-10.34-32.17-21.67L178-192.33 79.33-365l106.34-78.67q-1.67-8.33-2-18.16-.34-9.84-.34-18.17 0-8.33.34-18.17.33-9.83 2-18.16L79.33-595 178-767.67 296.33-715q14.34-11.33 32.34-21.67 18-10.33 34.66-16L382-880h196l18.67 126.67q17 6.33 35.16 16.33 18.17 10 31.84 22L782-767.67 880.67-595l-106.34 77.33q1.67 9 2 18.84.34 9.83.34 18.83 0 9-.34 18.5Q776-452 774-443l106.33 78-98.66 172.67-118-52.67q-14.34 11.33-32 22-17.67 10.67-35 16.33L578-80H382Zm55.33-66.67h85l14-110q32.34-8 60.84-24.5T649-321l103.67 44.33 39.66-70.66L701-415q4.33-16 6.67-32.17Q710-463.33 710-480q0-16.67-2-32.83-2-16.17-7-32.17l91.33-67.67-39.66-70.66L649-638.67q-22.67-25-50.83-41.83-28.17-16.83-61.84-22.83l-13.66-110h-85l-14 110q-33 7.33-61.5 23.83T311-639l-103.67-44.33-39.66 70.66L259-545.33Q254.67-529 252.33-513 250-497 250-480q0 16.67 2.33 32.67 2.34 16 6.67 32.33l-91.33 67.67 39.66 70.66L311-321.33q23.33 23.66 51.83 40.16 28.5 16.5 60.84 24.5l13.66 110Zm43.34-200q55.33 0 94.33-39T614-480q0-55.33-39-94.33t-94.33-39q-55.67 0-94.5 39-38.84 39-38.84 94.33t38.84 94.33q38.83 39 94.5 39ZM480-480Z" />
              </svg>
              <p>Settings</p>
            </div>
          </Button>
        </div>
      </section>
    </>
  );
};
