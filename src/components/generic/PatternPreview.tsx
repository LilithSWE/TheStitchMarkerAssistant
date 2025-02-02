import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PatternDispatchContext } from "../../context/PatternDispatchContext";
import { FetchedPattern } from "../../models/FetchedPattern";

type SinglePatternProps = {
  pattern: FetchedPattern;
};

export const PatternPreview = ({ pattern }: SinglePatternProps) => {
  const dispatch = useContext(PatternDispatchContext);
  const navigate = useNavigate();

  const handleOpenPattern = () => {
    dispatch({ type: "NEW", payload: pattern });
    setTimeout(() => {
      navigate("/pattern/" + pattern.pattern_id);
    }, 300);
  };

  return (
    <section
      className="patternPreview"
      id={pattern.pattern_id}
      onClick={handleOpenPattern}
    >
      <img src={pattern.img} loading="lazy" alt="" />
      <h4>{pattern.headline}</h4>
    </section>
  );
};
