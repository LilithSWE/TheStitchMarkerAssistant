import { ChangeEvent, useContext } from "react";
import { Button } from "./Button";
import { PatternFormDispatchContext } from "../../context/PatternFormDispatchContext";
import { PatternFormContext } from "../../context/PatternFormContext";
import { Pattern } from "../../models/Pattern";
import { Row } from "../../models/Row";
import { Part } from "../../models/Part";

type RowProps = {
  partId: number;
  row: Row;
};

export const RowForm = ({ partId, row }: RowProps) => {
  const pattern = useContext(PatternFormContext);
  const formDispatch = useContext(PatternFormDispatchContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateRow(name, value);
  };
  const updateRow = (name: string, value: string | number) => {
    // Changes value of the one row.
    let updatedPattern: Pattern = {
      ...pattern,
      parts: pattern.parts.map((oldPart) =>
        oldPart.part_id === partId // Find the correct part
          ? {
              ...oldPart,
              rows: oldPart.rows.map((oldRow) =>
                oldRow.row_start === row.row_start // Find the correct row
                  ? {
                      ...oldRow,
                      [name]: value,
                    }
                  : oldRow
              ),
            }
          : oldPart
      ),
    };

    if (name === "amount_of_rows") {
      updatedPattern = recalculateAllRowNumbers(updatedPattern);
    }

    // Updates the state for the pattern.
    formDispatch({
      type: "UPDATE",
      payload: updatedPattern,
    });
  };
  const recalculateAllRowNumbers = (updatedPattern: Pattern) => {
    const currenPart: Part[] = updatedPattern.parts.filter(
      (part) => part.part_id === partId
    );
    const allRows = currenPart[0].rows;

    // Change all rows accordingly.
    for (let i = 0; i < allRows.length; i++) {
      const row = allRows[i];
      if (i === 0) {
        row.row_start = 1;
      } else {
        row.row_start =
          allRows[i - 1].row_start + allRows[i - 1].amount_of_rows;
      }
    }

    const recalculatedPattern: Pattern = {
      ...updatedPattern,
      parts: updatedPattern.parts.map((oldPart) =>
        oldPart.part_id === partId // Find the correct part
          ? {
              ...oldPart,
              ["rows"]: allRows,
            }
          : oldPart
      ),
    };

    return recalculatedPattern;
  };
  const handleAddition = () => {
    const newAmountOfRows = row.amount_of_rows + 1;
    updateRow("amount_of_rows", newAmountOfRows);
  };
  const handleSubtraction = () => {
    if (row.amount_of_rows > 1) {
      const newAmountOfRows = row.amount_of_rows - 1;
      updateRow("amount_of_rows", newAmountOfRows);
    }
    return;
  };
  const handleDeleteRow = () => {
    const currenPart: Part[] = pattern.parts.filter(
      (part) => part.part_id === partId
    );
    const allRows = currenPart[0].rows;
    const updatedRows = allRows.filter(
      (oldRow) => oldRow.row_start !== row.row_start
    );

    let updatedPattern: Pattern = {
      ...pattern,
      parts: pattern.parts.map((oldPart) =>
        oldPart.part_id === partId // Find the correct part
          ? {
              ...oldPart,
              ["rows"]: updatedRows,
            }
          : oldPart
      ),
    };

    updatedPattern = recalculateAllRowNumbers(updatedPattern);

    formDispatch({
      type: "UPDATE",
      payload: updatedPattern,
    });
  };

  return (
    <>
      <section className="newRowContainer">
        <form>
          <h4>Row {row.row_start}</h4>
          <h5>Instructions</h5>
          <input
            type="text"
            name="instructions"
            id="rowInstructionInput"
            value={row.instructions}
            onChange={handleChange}
          />
        </form>
        <div className="newRowCounterContainer">
          <h5>Repeat for</h5>
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
            <p>{row.amount_of_rows}</p>
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
        <Button bgColor="return" onClick={handleDeleteRow}>
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
          </>
        </Button>
      </section>
      <div className="rowdivider"></div>
    </>
  );
};
