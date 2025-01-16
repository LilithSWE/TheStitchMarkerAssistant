import { ChangeEvent, useContext } from "react";
import { Button } from "./Button";
import { RowForm } from "./RowForm";
import { Part } from "../../models/Part";
import { PatternFormContext } from "../../context/PatternFormContext";
import { PatternFormDispatchContext } from "../../context/PatternFormDispatchContext";
import { Pattern } from "../../models/Pattern";

type Props = {
  part: Part;
};

export const PartForm = ({ part }: Props) => {
  const pattern = useContext(PatternFormContext);
  const formDispatch = useContext(PatternFormDispatchContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedPattern: Pattern = {
      ...pattern,
      parts: pattern.parts.map((oldPart) =>
        oldPart.part_id === part.part_id
          ? {
              ...oldPart,
              [name]: value,
            }
          : oldPart
      ),
    };

    formDispatch({
      type: "UPDATE",
      payload: updatedPattern,
    });
  };

  const handleNewRow = () => {
    const lastEntryIndex: number = part.rows.length - 1;
    const newRowNumber =
      part.rows[lastEntryIndex].row_start +
      part.rows[lastEntryIndex].amount_of_rows;

    const updatedPattern: Pattern = {
      ...pattern,
      parts: pattern.parts.map((oldPart) =>
        oldPart.headline === part.headline
          ? {
              ...oldPart,
              rows: [
                ...oldPart.rows,
                {
                  row_start: newRowNumber,
                  instructions: "",
                  amount_of_rows: 1,
                },
              ],
            }
          : part
      ),
    };
    formDispatch({
      type: "UPDATE",
      payload: updatedPattern,
    });
  };

  const handleDeletePart = () => {
    const updatedParts = pattern.parts.filter(
      (oldPart) => oldPart.part_id !== part.part_id
    );

    const updatedPattern: Pattern = {
      ...pattern,
      ["parts"]: updatedParts,
    };

    formDispatch({
      type: "UPDATE",
      payload: updatedPattern,
    });
  };

  return (
    <>
      <form>
        <h4>Part Headline</h4>
        <input
          type="text"
          name="headline"
          value={part.headline}
          onChange={handleChange}
        />
        <h5>Notes</h5>
        <input
          type="text"
          name="notes"
          value={part.notes}
          onChange={handleChange}
        />
      </form>
      <div className="rowdivider"></div>

      {part.rows.map((row, index) => (
        <>
          <RowForm partId={part.part_id} key={index} row={row} />
        </>
      ))}
      <div className="newRowBtnContainer">
        <Button
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
              <p>New Row</p>
            </>
          }
          bgColor="tetriary"
          onClick={handleNewRow}
        />
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
                <path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z" />
              </svg>

              <p>Delete Part</p>
            </>
          }
          bgColor="return"
          onClick={handleDeletePart}
        />
      </div>
      <div className="divider"></div>
    </>
  );
};
