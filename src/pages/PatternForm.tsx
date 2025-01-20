import { ChangeEvent, useContext, useState } from "react";
import { Button } from "../components/generic/Button";
import { PartForm } from "../components/generic/PartForm";
import { HeaderSmall } from "../components/singular/HeaderSmall";
import { PatternFormContext } from "../context/PatternFormContext";
import { useNavigate, useParams } from "react-router-dom";
import { PatternFormDispatchContext } from "../context/PatternFormDispatchContext";
import { Pattern } from "../models/Pattern";
import supabaseClient from "../services/supabaseClient";
import { PopuUp } from "../components/generic/PopUp";
import { FetchedPattern } from "../models/FetchedPattern";
import { Part } from "../models/Part";
import { Loader } from "../components/generic/Loader";

export const PatternForm = () => {
  const navigate = useNavigate();
  const pattern = useContext(PatternFormContext);
  const formDispatch = useContext(PatternFormDispatchContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showCompletedSavePopup, setShowCompletedSavePopup] = useState(false);
  const [patternType, setPatternType] = useState(pattern.type || "knitting");
  const nameOfImage = pattern.img?.replace("./images/", "");
  const [message, setMessage] = useState("I have no more info..");
  const { newPattern } = useParams();
  const [showLoader, setShowLoader] = useState(false);

  const getRandomInt = () => {
    let inUse = true;
    let number = Math.floor(Math.random() * 1000) + 1;
    while (inUse) {
      number = Math.floor(Math.random() * 1000) + 1;
      inUse = alreadyInUse(number);
    }
    return number;
  };
  const alreadyInUse = (number: number) => {
    pattern.parts.forEach((part) => {
      if (part.part_id === number) {
        return true;
      }
    });
    return false;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    formDispatch({
      type: "UPDATE",
      payload: { ...pattern, [e.target.name]: e.target.value },
    });
  };

  const handleReturn = () => {
    if (pattern.pattern_id) {
      setTimeout(() => {
        navigate("/pattern/" + pattern.pattern_id);
      }, 300);
    } else {
      setTimeout(() => {
        navigate("/patterns");
      }, 300);
    }
  };

  const handleClosePopup = () => {
    const section = document.querySelector("section");
    section?.classList.remove("blur");
    setTimeout(() => {
      setShowPopUp(false);
    }, 300);
  };

  const handleCloseCompletedSavePopup = () => {
    const section = document.querySelector("section");
    section?.classList.remove("blur");
    setTimeout(() => {
      navigate("/patterns");
      setShowCompletedSavePopup(false);
    }, 300);
  };

  const handleUploadImg = () => {
    console.log("clicked 'Upload Img'!");
  };

  const handleSwitchType = (type: string) => {
    setPatternType(type);
    pattern.type = type;
  };

  const handleNewPart = () => {
    const updatedPattern: Pattern = {
      ...pattern,
      parts: [
        ...pattern.parts,
        {
          part_id: getRandomInt(),
          headline: "",
          img: "",
          notes: "",
          rows: [
            {
              row_start: 1,
              instructions: "",
              amount_of_rows: 1,
            },
          ],
        },
      ],
    };
    formDispatch({
      type: "UPDATE",
      payload: updatedPattern,
    });
  };

  const checkForm = () => {
    const emptyRows = pattern.parts.some((part) =>
      part.rows.some((row) => !row.instructions || row.instructions === "")
    );

    if (!pattern.headline || pattern.headline === "") {
      setMessage("You need to give the pattern a name before you save it.");
      setShowPopUp(true);
      return false;
    } else if (pattern.parts.length === 0) {
      setMessage("Your pattern needs at least one part before you save it.");
      setShowPopUp(true);
      return false;
    } else if (emptyRows) {
      setMessage(
        "You have rows without instructios in them. Please edit this before saving."
      );
      setShowPopUp(true);
      return false;
    }

    // Change default image, if it is in use.
    if (
      pattern.img === "./images/knitting.png" ||
      pattern.img === "./images/crochet.png"
    ) {
      if (pattern.type === "knitting") {
        pattern.img = "./images/knitting.png";
      } else if (pattern.type === "crochet") {
        pattern.img = "./images/crochet.png";
      }
    }
    return true;
  };

  const handleSavePattern = async () => {
    setShowLoader(true);
    const submitNewToPatternDB = async (user_id: string) => {
      const { data, error } = await supabaseClient
        .from("Patterns")
        .insert([
          {
            user_id: user_id,
            headline: pattern.headline,
            img: pattern.img,
            notes: pattern.notes,
            type: pattern.type,
          },
        ])
        .select();
      if (error) {
        console.log(error);
      }
      if (data) {
        return data.map((item) => ({
          created_at: item.created_at,
          headline: item.headline,
          img: item.img,
          notes: item.notes,
          pattern_id: item.pattern_id,
          type: item.type,
          user_id: item.user_id,
        }));
      }

      return [];
    };
    const submitNewToPartsDB = async (response: FetchedPattern) => {
      const submitSinglePart = async (part: Part) => {
        const { data, error } = await supabaseClient.from("Parts").upsert([
          {
            user_id: response.user_id,
            pattern_id: response.pattern_id,
            part_id: part.part_id,
            headline: part.headline,
            img: part.img,
            notes: part.notes,
            rows: part.rows,
          },
        ]);
        if (error) {
          console.log(error);
        }
        if (data) {
          console.log(data);
        }
      };

      pattern.parts.forEach((part) => {
        submitSinglePart(part);
      });
    };
    const submitUpdateToPatternDB = async (user_id: string) => {
      console.log(pattern);

      const { data, error } = await supabaseClient
        .from("Patterns")
        .update({
          headline: pattern.headline,
          img: pattern.img,
          notes: pattern.notes,
          type: pattern.type,
        })
        .eq("user_id", user_id)
        .eq("pattern_id", pattern.pattern_id)
        .select();
      if (error) {
        console.log(error);
      }
      if (data) {
        return data.map((item) => ({
          created_at: item.created_at,
          headline: item.headline,
          img: item.img,
          notes: item.notes,
          pattern_id: item.pattern_id,
          type: item.type,
          user_id: item.user_id,
        }));
      }

      return [];
    };

    let correctForm = false;
    correctForm = checkForm();

    if (correctForm) {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) {
        console.log("User ID not found in localStorage");
        return;
      }
      setShowCompletedSavePopup(true);
      if (newPattern === "true") {
        try {
          const response = await submitNewToPatternDB(user_id);
          if (response.length > 0) {
            await submitNewToPartsDB(response[0]);
          }
        } catch (error) {
          console.error("Error saving pattern and parts:", error);
        }
      } else if (newPattern === "false") {
        try {
          const response = await submitUpdateToPatternDB(user_id);
          if (response.length > 0) {
            await submitNewToPartsDB(response[0]);
          }
        } catch (error) {
          console.error("Error saving pattern and parts:", error);
        }
      }
    }
    setShowLoader(false);
  };

  return (
    <>
      {showLoader ? <Loader /> : <></>}
      {showPopUp ? (
        <PopuUp
          message={<h3>{message}</h3>}
          onClose={handleClosePopup}
        ></PopuUp>
      ) : (
        <></>
      )}
      {showCompletedSavePopup ? (
        <PopuUp
          message={
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35px"
                viewBox="0 -960 960 960"
                width="35px"
                fill="currentcolor"
              >
                <path d="M840-682v495.33q0 27-19.83 46.84Q800.33-120 773.33-120H186.67q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840H682l158 158Zm-66.67 29.33L652.67-773.33h-466v586.66h586.66v-466ZM479.84-243.33q45.49 0 77.49-31.85 32-31.84 32-77.33 0-45.49-31.84-77.49-31.84-32-77.33-32-45.49 0-77.49 31.84-32 31.85-32 77.34t31.84 77.49q31.84 32 77.33 32ZM235.33-576H594v-148.67H235.33V-576Zm-48.66-76.67v466-586.66 120.66Z" />
              </svg>
              <h4>Your pattern is saved!</h4>
            </>
          }
          onClose={handleCloseCompletedSavePopup}
        ></PopuUp>
      ) : (
        <></>
      )}
      <HeaderSmall bgColor="secondary" />
      <section className="secondView">
        <h2>New Pattern</h2>
        <section className="patternFormContainer">
          <Button
            children={
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="35px"
                  viewBox="0 -960 960 960"
                  width="35px"
                  fill="currentcolor"
                >
                  <path d="M359.33-240 120-479.33l239.33-239.34 47.34 47.34L247.33-512h526v-168H840v234H248l158.67 158.67L359.33-240Z" />
                </svg>
                <p>Return Without Saving</p>
              </>
            }
            bgColor="return"
            onClick={handleReturn}
          />
          <form>
            <h4>Pattern Headline</h4>
            <input
              type="text"
              name="headline"
              value={pattern.headline}
              onChange={handleChange}
            />
            <h5>Notes</h5>
            <input
              type="text"
              name="notes"
              value={pattern.notes}
              onChange={handleChange}
            />
          </form>
          <section className="imageUploadContainer">
            <h5>Image</h5>
            <p className="imgName">{nameOfImage}</p>
            <Button
              children={
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="35px"
                    viewBox="0 -960 960 960"
                    width="35px"
                    fill="#currentcollor"
                  >
                    <path d="M186.67-120q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h586.66q27 0 46.84 19.83Q840-800.33 840-773.33v586.66q0 27-19.83 46.84Q800.33-120 773.33-120H186.67Zm0-66.67h586.66v-586.66H186.67v586.66ZM237.33-278h486l-148-197.33-128 167.33-92-124.67-118 154.67Zm-50.66 91.33v-586.66 586.66Z" />
                  </svg>
                  <p>Upload Image</p>
                </>
              }
              bgColor="secondary"
              onClick={handleUploadImg}
            />
          </section>

          <h5>Type</h5>
          <section className="typeBtnContainer">
            {patternType === "knitting" ? (
              <>
                <Button
                  bgColor="primary"
                  onClick={() => handleSwitchType("knitting")}
                  children={<>Knitting</>}
                />
                <Button
                  bgColor="grey"
                  onClick={() => handleSwitchType("crochet")}
                  children={<>Crochet</>}
                />
              </>
            ) : (
              <>
                <Button
                  bgColor="grey"
                  onClick={() => handleSwitchType("knitting")}
                  children={<>Knitting</>}
                />
                <Button
                  bgColor="primary"
                  onClick={() => handleSwitchType("crochet")}
                  children={<>Crochet</>}
                />
              </>
            )}
          </section>
          <section className="patterFormPartsContainer">
            {pattern.parts.map((part) => (
              <PartForm key={part.part_id} part={part} />
            ))}
          </section>
          <Button
            bgColor="secondary"
            onClick={handleNewPart}
            children={
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
                <p>New Part</p>
              </>
            }
          />
          <div className="primaryBtnContainer">
            <Button
              children={
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="35px"
                    viewBox="0 -960 960 960"
                    width="35px"
                    fill="currentcolor"
                  >
                    <path d="M840-682v495.33q0 27-19.83 46.84Q800.33-120 773.33-120H186.67q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840H682l158 158Zm-66.67 29.33L652.67-773.33h-466v586.66h586.66v-466ZM479.84-243.33q45.49 0 77.49-31.85 32-31.84 32-77.33 0-45.49-31.84-77.49-31.84-32-77.33-32-45.49 0-77.49 31.84-32 31.85-32 77.34t31.84 77.49q31.84 32 77.33 32ZM235.33-576H594v-148.67H235.33V-576Zm-48.66-76.67v466-586.66 120.66Z" />
                  </svg>
                  <p>Save Pattern</p>
                </>
              }
              bgColor="primary"
              onClick={handleSavePattern}
            />
            <Button
              children={
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="35px"
                    viewBox="0 -960 960 960"
                    width="35px"
                    fill="currentcolor"
                  >
                    <path d="M359.33-240 120-479.33l239.33-239.34 47.34 47.34L247.33-512h526v-168H840v234H248l158.67 158.67L359.33-240Z" />
                  </svg>
                  <p>Return Without Saving</p>
                </>
              }
              bgColor="return"
              onClick={handleReturn}
            />
          </div>
        </section>
      </section>
    </>
  );
};
