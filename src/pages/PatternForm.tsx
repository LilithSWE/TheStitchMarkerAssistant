import { ChangeEvent, useContext, useState } from "react";
import { Button } from "../components/generic/Button";
import { PartForm } from "../components/generic/PartForm";
import { HeaderSmall } from "../components/singular/HeaderSmall";
import { PatternFormContext } from "../context/PatternFormContext";
import { useNavigate } from "react-router-dom";
import { PatternFormDispatchContext } from "../context/PatternFormDispatchContext";
import { Pattern } from "../models/Pattern";

export const PatternForm = () => {
  const navigate = useNavigate();
  const BASE_URL = "/TheStitchMarkerAssistant/";
  const pattern = useContext(PatternFormContext);
  const formDispatch = useContext(PatternFormDispatchContext);

  const [patternType, setPatternType] = useState(pattern.type || "knitting");
  const nameOfImage = pattern.img?.replace("./images/", "");

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
        navigate(BASE_URL + "pattern/" + pattern.pattern_id);
      }, 300);
    } else {
      setTimeout(() => {
        navigate(BASE_URL + "patterns");
      }, 300);
    }
  };

  const handleUploadImg = () => {
    console.log("clicked 'Upload Img'!");
  };

  const handleSwitchType = (type: string) => {
    setPatternType(type);
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

  const handleSavePattern = () => {
    console.log("Saved the pattern... or you will! ");
    // For the API call to both Pattern and Parts DB!
  };

  return (
    <>
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
                  bgColor="disabled"
                  onClick={() => handleSwitchType("crochet")}
                  children={<>Crochet</>}
                />
              </>
            ) : (
              <>
                <Button
                  bgColor="disabled"
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
                {" "}
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
