import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabaseClient from "../services/supabaseClient";
import { FetchedPart } from "../models/FetchedPart";
import { PatternContext } from "../context/PatternContext";
import { PartPreview } from "../components/generic/PartPreview";
import { Button } from "../components/generic/Button";
import { HeaderSmall } from "../components/singular/HeaderSmall";
import { Nav } from "../components/generic/Nav";
import { NavButtonProps } from "../models/NavButtonProps";

export const Pattern = () => {
  const navigate = useNavigate();
  const BASE_URL = "/TheStitchMarkerAssistant/";
  const pattern = useContext(PatternContext);
  const [parts, setParts] = useState<FetchedPart[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const getSinglePattern = async (user_id: string, pattern_id: string) => {
      const { data, error } = await supabaseClient
        .from("Parts")
        .select()
        .eq("user_id", user_id)
        .eq("pattern_id", pattern_id);
      if (error) {
        console.log(error);
      }
      if (data) {
        const parsedData: FetchedPart[] = data.map((item) => ({
          part_id: item.part_id,
          pattern_id: item.pattern_id,
          headline: item.headline,
          img: item.img,
          notes: item.notes,
          rows: item.rows,
          user_id: item.user_id,
        }));
        setParts(parsedData); // Assign parsed data to state
      }
    };

    const user_id = localStorage.getItem("user_id");
    if (user_id && id) {
      getSinglePattern(user_id, id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditPattern = () => {
    console.log("clicked Edit!");
  };

  const handleDeletePattern = () => {
    console.log("clicked Delete!");
  };

  const handleToPatterns = () => {
    setTimeout(() => {
      navigate(BASE_URL + "patterns");
    }, 300);
  };
  const handleToHome = () => {
    setTimeout(() => {
      navigate(BASE_URL);
    }, 300);
  };
  const handleToSettings = () => {
    setTimeout(() => {
      navigate(BASE_URL + "settings");
    }, 300);
  };

  const navButtons: NavButtonProps[] = [
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
      <HeaderSmall bgColor="tetriary" />
      <section className="patternView">
        {pattern.img ? (
          <img
            src={pattern.img.replace("./", "../")}
            alt="main pattern image"
          />
        ) : (
          <></>
        )}
        <h2>{pattern.headline}</h2>
        <Button bgColor="secondary" onClick={handleEditPattern}>
          <div className="btnText">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="35px"
              viewBox="0 -960 960 960"
              width="35px"
              fill="currentcolor"
            >
              <path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z" />
            </svg>
            <p>Edit Pattern</p>
          </div>
        </Button>
        {pattern.notes ? (
          <article className="patternNotes">
            <h4>Notes</h4>
            <p>{pattern.notes}</p>
          </article>
        ) : (
          <></>
        )}
        {parts.map((part) => (
          <PartPreview key={part.part_id} part={part} />
        ))}
        <div className="primaryBtnContainer">
          <Button bgColor="secondary" onClick={handleEditPattern}>
            <div className="btnText">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35px"
                viewBox="0 -960 960 960"
                width="35px"
                fill="currentcolor"
              >
                <path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z" />
              </svg>
              <p>Edit Pattern</p>
            </div>
          </Button>
          <Button bgColor="return" onClick={handleDeletePattern}>
            <div className="btnText">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35px"
                viewBox="0 -960 960 960"
                width="35px"
                fill="#currentcollor"
              >
                <path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z" />
              </svg>
              <p>Delete Pattern</p>
            </div>
          </Button>
        </div>
      </section>
      <Nav bgColor="tetriary" buttons={navButtons} />
    </>
  );
};
