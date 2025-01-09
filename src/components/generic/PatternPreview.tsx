type PatternPreviewProps = {
  img: string;
  headline: string;
  id: string;
};

export const PatternPreview = ({ img, headline, id }: PatternPreviewProps) => {
  const handleOpenPattern = () => {
    console.log("clicked the pattern! :" + id);
  };

  return (
    <section className="patternPreview" id={id} onClick={handleOpenPattern}>
      <img src={img} alt="" />
      <h4>{headline}</h4>
    </section>
  );
};
