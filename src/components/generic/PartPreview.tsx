import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useContext } from "react";
import { PatternContext } from "../../context/PatternContext";
import { Row } from "../../models/Row";
import { SingleRowInstruction } from "../../models/SingleRowInstruction";
import { Part } from "../../models/Part";

type SinglePartProps = {
  part: Part;
};

export const PartPreview = ({ part }: SinglePartProps) => {
  const pattern = useContext(PatternContext);
  const navigate = useNavigate();

  const calculateRows = () => {
    const rows: Row[] = part.rows;
    const newRowArray: SingleRowInstruction[] = [];

    rows.forEach((row) => {
      if (row.instructions) {
        if (row.amount_of_rows === 1) {
          newRowArray.push({ instructions: row.instructions });
        } else {
          for (let i = 0; i < row.amount_of_rows; i++) {
            newRowArray.push({ instructions: row.instructions });
          }
        }
      } else {
        newRowArray.push({ instructions: "Instructions missing..." });
      }
    });

    return newRowArray;
  };

  const handleStartRowcounter = () => {
    const currentPiece = pattern.headline + ": " + part.headline;
    const currentRows = calculateRows();
    localStorage.setItem("currentCount", "1");
    localStorage.setItem("currentPiece", currentPiece);
    localStorage.setItem("currentRows", JSON.stringify(currentRows));

    setTimeout(() => {
      navigate("/rowcounter");
    }, 300);
  };

  return (
    <section className="partPreview">
      <h3>{part.headline}</h3>
      {part.img ? <img src={part.img} alt="part of pattern" /> : <></>}
      <Button bgColor="tetriary" onClick={handleStartRowcounter}>
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
          <p>Start Rowcounter</p>
        </div>
      </Button>
      {part.notes ? (
        <article>
          <h4>Notes</h4>
          <p>{part.notes}</p>
        </article>
      ) : (
        <></>
      )}
      <article>
        <h4>Instructions</h4>
        {part.rows.map((row) => (
          <div className="rowInstructionContainer" key={row.row_start}>
            <p>{row.row_start}.</p>
            <p>{row.instructions}</p>
          </div>
        ))}
      </article>
    </section>
  );
};
