import { useNavigate } from "react-router-dom";
import { Button } from "../components/generic/Button";
import { HeaderSmall } from "../components/singular/HeaderSmall";
import { Nav } from "../components/generic/Nav";
import { NavButtonProps } from "../models/NavButtonProps";
import { useEffect, useState } from "react";
import { PopuUp } from "../components/generic/PopUp";
import { SingleRowInstruction } from "../models/SingleRowInstruction";

export const RowCounter = () => {
  const [count, setCount] = useState(0);
  const [patternAndPartName, setPatternAndPartName] =
    useState("Pattern Name: Part");
  const [allRows, setAllRows] = useState<SingleRowInstruction[]>([
    {
      instructions: "This is the rowcounter!",
    },
  ]);
  const [rowContent, setRowContent] = useState(
    "Please go to your patterns and pick a piece to start counting!"
  );
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const oldCount = localStorage.getItem("currentCount");
    const piece = localStorage.getItem("currentPiece");
    const rows = localStorage.getItem("currentRows");
    if (oldCount) {
      setCount(Number(oldCount));
    }
    if (piece) {
      setPatternAndPartName(piece);
    }
    if (rows) {
      const parsedRows: SingleRowInstruction[] = rows ? JSON.parse(rows) : [];
      setAllRows(parsedRows);
      if (oldCount) {
        setRowContent(parsedRows[Number(oldCount) - 1].instructions);
      }
    }
  }, []);

  /* Count change */
  const handleAddition = () => {
    const totalAmountOfRows = allRows.length;
    const newCount = count + 1;
    if (newCount <= totalAmountOfRows || newCount === totalAmountOfRows) {
      setCount(newCount);
      setRowContent(allRows[newCount - 1].instructions);
      localStorage.setItem("currentCount", JSON.stringify(newCount));
    } else if (newCount >= totalAmountOfRows) {
      setShowPopUp(true);
    }
  };
  const handleSubtraction = () => {
    const newCount = count - 1;
    if (newCount === 0 || count === 0) {
      setCount(0);
      setRowContent("Best of luck!");
      return;
    }
    setCount(newCount);
    setRowContent(allRows[newCount - 1].instructions);
    localStorage.setItem("currentCount", JSON.stringify(newCount));
  };

  /* Navigation */
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
  const handleToSettings = () => {
    setTimeout(() => {
      navigate("/settings");
    }, 300);
  };
  const handleReturn = () => {
    const section = document.querySelector("section");
    section?.classList.remove("blur");
    setShowPopUp(false);
  };
  const navButtons: NavButtonProps[] = [
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
      onClick: handleToSettings,
      children: (
        <div className="navBtnText">
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
      ),
    },
  ];

  return (
    <>
      {showPopUp ? (
        <PopuUp
          message={<h3>Congratulations you finished the part!</h3>}
          onClose={handleReturn}
        ></PopuUp>
      ) : (
        <></>
      )}
      <HeaderSmall bgColor="tetriary" />
      <section className="secondView">
        <div className="rowCounterHeadlineContainer">
          <h2 className="rowCounterHeadline">Rowcounter</h2>
          <p className="patternInfo">{patternAndPartName}</p>
        </div>
        <div className="rowContent">
          <p>{rowContent}</p>
        </div>

        <div className="counterContainer">
          <Button bgColor="primary plus" onClick={handleAddition}>
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#currentColor"
              >
                <path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z" />
              </svg>
            </>
          </Button>
          <div className="count">
            <p>{count}</p>
          </div>
          <Button bgColor="secondary minus" onClick={handleSubtraction}>
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#currentcolor"
              >
                <path d="M200-446.67v-66.66h560v66.66H200Z" />
              </svg>
            </>
          </Button>
        </div>
      </section>
      <Nav bgColor="tetriary" buttons={navButtons} />
    </>
  );
};
