import { FetchedPattern } from "../models/FetchedPattern";
import { Part } from "../models/Part";
import { Pattern } from "../models/Pattern";
import supabaseClient from "../services/supabaseClient";

export const handleRegFreePattern = async () => {
  const pattern: Pattern = {
    headline: "Max",
    img: "./images/max.png",
    notes:
      "This is a free pattern written by the owner of the website! Yarn: White, black and pink. sc2ptog = 'single crochet 2 pieces together'",
    type: "crochet",
    parts: [
      {
        part_id: 1,
        headline: "Hands and Arms",
        notes:
          "Made in white. The right and left arm are made a little differently. Pay attention to what the instruction on the row says.",
        rows: [
          {
            row_start: 1,
            amount_of_rows: 1,
            instructions: "4 sc in mr (4)",
          },
          {
            row_start: 2,
            amount_of_rows: 1,
            instructions: "[1 inc, 1 sc] * 2 (6)",
          },
          {
            row_start: 3,
            amount_of_rows: 3,
            instructions: "6 sc (6)",
          },
          {
            row_start: 6,
            amount_of_rows: 1,
            instructions:
              "If thumb -> fasten off, hide the tail. Restart part.",
          },
          {
            row_start: 7,
            amount_of_rows: 1,
            instructions: "6 sc (6)",
          },
          {
            row_start: 8,
            amount_of_rows: 1,
            instructions:
              "If finger 1 and 2 -> fasten off, hide the tail. Restart part.",
          },
          {
            row_start: 9,
            amount_of_rows: 1,
            instructions:
              "3 sc into finger 1, 6 sc into finger 2, 3 sc into finger 1, 6 sc into finger 3. (18)",
          },
          {
            row_start: 10,
            amount_of_rows: 1,
            instructions: "18 sc (18)",
          },
          {
            row_start: 11,
            amount_of_rows: 1,
            instructions: "Add stuffing to all of the fingers",
          },
          {
            row_start: 12,
            amount_of_rows: 1,
            instructions: "14 sc, 3 sc2ptog with thumb, 1 sc (18)",
          },
          {
            row_start: 13,
            amount_of_rows: 1,
            instructions:
              "14 sc, 3 sc into thumbs free st, 1 sc + 2 sc, for new beginning of rounds. (18 (+2))",
          },
          {
            row_start: 14,
            amount_of_rows: 1,
            instructions:
              "Left hand: 14 sc, 2 dec. Right hand: 9 sc, 2 dec, 5 sc (16)",
          },
          {
            row_start: 15,
            amount_of_rows: 1,
            instructions:
              "Left hand: 1 dec, 12 sc, 1 dec. Right hand: 6 sc, 2 dec, 6 sc (14)",
          },
          {
            row_start: 16,
            amount_of_rows: 1,
            instructions:
              "Left hand: 2 dec, 10 sc. Right hand: 5 sc, 2 dec, 5 sc (12)",
          },
          {
            row_start: 17,
            amount_of_rows: 1,
            instructions: "Stuff the hand",
          },
          {
            row_start: 18,
            amount_of_rows: 1,
            instructions: "[1 dec, 4 sc] * 2 (10)",
          },
          {
            row_start: 19,
            amount_of_rows: 17,
            instructions: "10 sc, stuffing the arm as you go. (10)",
          },
          {
            row_start: 36,
            amount_of_rows: 1,
            instructions:
              "Finish off, cut the yarn and weave in the yarn tail. ",
          },
        ],
      },
      {
        part_id: 2,
        headline: "Body",
        notes: "Made in white.",
        rows: [
          {
            row_start: 1,
            amount_of_rows: 1,
            instructions: "6 sc in mc (6)",
          },
          {
            row_start: 2,
            amount_of_rows: 1,
            instructions: "6 inc (12)",
          },
          {
            row_start: 3,
            amount_of_rows: 1,
            instructions: "[1 inc, 1 sc] * 6 (18)",
          },
          {
            row_start: 4,
            amount_of_rows: 1,
            instructions: "1 sc, [1 inc, 2 sc] * 5, 1 inc, 1 sc (24)",
          },
          {
            row_start: 5,
            amount_of_rows: 1,
            instructions: "[1 inc, 3 sc] * 6 (30)",
          },
          {
            row_start: 6,
            amount_of_rows: 1,
            instructions: "2 sc, [1 inc, 4 sc] * 5, 1 inc, 2 sc (36)",
          },
          {
            row_start: 7,
            amount_of_rows: 1,
            instructions: "[1 inc, 5 sc] * 6 (42)",
          },
          {
            row_start: 8,
            amount_of_rows: 8,
            instructions: "42 sc (42)",
          },
          {
            row_start: 16,
            amount_of_rows: 1,
            instructions: "[1 dec, 5 sc] * 6 (36)",
          },
          {
            row_start: 17,
            amount_of_rows: 1,
            instructions: "2 sc, [1 dec, 4 sc] * 5, 1 dec, 2 sc (30)",
          },

          {
            row_start: 16,
            amount_of_rows: 1,
            instructions: "[1 dec, 5 sc] * 6 (36)",
          },
          {
            row_start: 17,
            amount_of_rows: 1,
            instructions: "2 sc, [1 dec, 4 sc] * 5, 1 dec, 2 sc (30)",
          },
          {
            row_start: 16,
            amount_of_rows: 1,
            instructions: "[1 dec, 5 sc] * 6 (36)",
          },
          {
            row_start: 18,
            amount_of_rows: 2,
            instructions: "30 sc (30)",
          },
          {
            row_start: 20,
            amount_of_rows: 1,
            instructions: "[1 dec, 3 sc] * 6 (24)",
          },
          {
            row_start: 21,
            amount_of_rows: 4,
            instructions: "24 sc (24)",
          },
          {
            row_start: 25,
            amount_of_rows: 1,
            instructions:
              "4sc, 5 sc2ptog (left arm), 6 sc, 5 sc2ptog (right arm), 4 sc (24)",
          },
          {
            row_start: 26,
            amount_of_rows: 1,
            instructions:
              "3 sc, 1 dec (1 body st + 1st free arm st), 3 sc across arm, dec (1 body st + 1st free arm st), 4 sc, 1 dec (1 body st + 1st free arm st), 3 sc across arm,1 dec (1 body st + 1st free arm st), 3 sc. (20)",
          },
          {
            row_start: 27,
            amount_of_rows: 1,
            instructions: "20 sc (20)",
          },
          {
            row_start: 28,
            amount_of_rows: 1,
            instructions:
              "Stuff the body, fasten off leaving a long tail for sewing the body to the head later on.",
          },
        ],
      },
      {
        part_id: 3,
        headline: "Head",
        notes: "Made in white.",
        rows: [
          {
            row_start: 1,
            amount_of_rows: 1,
            instructions:
              "Ch 5, starting in 2nd ch from the hook and working in the round from the next row.. (5)",
          },
          {
            row_start: 2,
            amount_of_rows: 1,
            instructions: "[3 sc, 3 sc in 1 st] * 2 (12)",
          },
          {
            row_start: 3,
            amount_of_rows: 1,
            instructions: "[3 sc, 3 inc] * 2 (18)",
          },
          {
            row_start: 4,
            amount_of_rows: 1,
            instructions:
              "3 sc, [1 inc, 1 sc] * 3, 3 sc, [1 inc, 1 sc] * 3 (24)",
          },
          {
            row_start: 5,
            amount_of_rows: 1,
            instructions:
              "4 sc, [1 inc, 2 sc] * 2, 1 inc, 5 sc, [1 inc, 2 sc] * 2, 1 inc, 1 sc. (30)",
          },
          {
            row_start: 6,
            amount_of_rows: 1,
            instructions:
              "3 sc, [1 inc, 3 sc] * 3, 3 sc, [1 inc, 3 sc] * 3 (36)",
          },
          {
            row_start: 7,
            amount_of_rows: 1,
            instructions:
              "5 sc, [1 inc, 4 sc] * 2, 1 inc, 7 sc, [1 inc, 4 sc] * 2, 1 inc, 2 sc. (42)",
          },
          {
            row_start: 8,
            amount_of_rows: 1,
            instructions:
              "3 sc, [1 inc, 5 sc] * 3, 3 sc, [1 inc, 5 sc] * 3 (48)",
          },
          {
            row_start: 9,
            amount_of_rows: 1,
            instructions:
              "6 sc, [1 inc, 6 sc] * 2, 1 inc, 9 sc, [1  inc, 6 sc] * 2, 1 inc, 3 sc (54)",
          },
          {
            row_start: 10,
            amount_of_rows: 1,
            instructions:
              "3 sc, [1 inc, 7 sc] * 3, 3 sc, [1 inc, 7 sc] * 3 (60)",
          },
          {
            row_start: 11,
            amount_of_rows: 1,
            instructions:
              "7 sc, [1 inc, 8 sc] * 2, 1 inc, 11 sc, [1 inc, 8 sc] * 2, 1 inc, 4 sc (66)",
          },
          {
            row_start: 12,
            amount_of_rows: 9,
            instructions: "66 sc (66)",
          },
          {
            row_start: 21,
            amount_of_rows: 1,
            instructions:
              "7 sc, [1 dec, 8 sc] * 2, 1 dec, 11 sc, [1 dec, 8 sc] * 2, 1 dec, 4 sc (60)",
          },
          {
            row_start: 23,
            amount_of_rows: 1,
            instructions:
              "6 sc, [1 dec, 6 sc] * 2, 1 dec, 9 sc, [1  dec, 6 sc] * 2, 1 dec, 3 sc (48)",
          },
          {
            row_start: 24,
            amount_of_rows: 1,
            instructions:
              "3 sc, [1 dec, 5 sc] * 3, 3 sc, [1 dec, 5 sc] * 3 (42)",
          },
          {
            row_start: 25,
            amount_of_rows: 1,
            instructions:
              "5 sc, [1 dec, 4 sc] * 2, 1 dec, 7 sc, [1 dec, 4 sc] * 2, 1 dec, 2 sc. (36)",
          },
          {
            row_start: 26,
            amount_of_rows: 1,
            instructions:
              "3 sc, [1 dec, 3 sc] * 3, 3 sc, [1 dec, 3 sc] * 3 (30)",
          },
          {
            row_start: 27,
            amount_of_rows: 1,
            instructions:
              "4 sc, [1 dec, 2 sc] * 2, 1 dec, 5 sc, [1 dec, 2 sc] * 2, 1 dec, 1 sc. (24)",
          },
          {
            row_start: 28,
            amount_of_rows: 1,
            instructions: "Stuff head somewhat",
          },
          {
            row_start: 29,
            amount_of_rows: 1,
            instructions:
              "3 sc, [1 dec, 1 sc] * 3, 3 sc, [1 dec, 1 sc] * 3 (18)",
          },
          {
            row_start: 30,
            amount_of_rows: 1,
            instructions: "[3 sc, 3 dec] * 2 (12)",
          },
          {
            row_start: 31,
            amount_of_rows: 1,
            instructions: "Stuff head all the way",
          },
          {
            row_start: 32,
            amount_of_rows: 1,
            instructions: "[2 sc, 2 dec] (8)",
          },
          {
            row_start: 33,
            amount_of_rows: 1,
            instructions:
              "Stuff the last part if needed. Fasten off and sew shut. Cut yarn leaving enough tail to close the head by sewing. Embroider the nose in pink yarn on row 19, centred over the mouth with a width of 5 st.",
          },
        ],
      },
      {
        part_id: 4,
        headline: "Mouth",
        notes:
          "This is the crocheted version of the mouth. Make it in white and then embroider black lines for teeth afterwards. In the image the mouth is made of fleece and glued on instead. ",
        rows: [
          {
            row_start: 1,
            amount_of_rows: 1,
            instructions: "Ch 19 (19)",
          },
          {
            row_start: 2,
            amount_of_rows: 1,
            instructions:
              "Starting from the 2nd st from the hook, working in the round. [sc 17, 3 sc into 1 st] * 2 (40)",
          },
          {
            row_start: 3,
            amount_of_rows: 1,
            instructions: "5 sc, 10 hdc, 5 sc (40)",
          },
          {
            row_start: 4,
            amount_of_rows: 1,
            instructions:
              "Finish off and embroider black lines for teeth separation in a zig-zag pattern",
          },
        ],
      },
      {
        part_id: 5,
        headline: "Ears",
        notes: "Make 2, in white yarn",
        rows: [
          {
            row_start: 1,
            amount_of_rows: 1,
            instructions: "6 sc in mc (6)",
          },
          {
            row_start: 2,
            amount_of_rows: 1,
            instructions: "6 inc (12)",
          },
          {
            row_start: 3,
            amount_of_rows: 1,
            instructions: "[1 inc, 1 sc] * 6 (18)",
          },
          {
            row_start: 4,
            amount_of_rows: 1,
            instructions: "1 sc, [1 inc, 2 sc] * 5, 1 inc, 1 sc (24)",
          },
          {
            row_start: 5,
            amount_of_rows: 8,
            instructions: "24 sc (24)",
          },
          {
            row_start: 13,
            amount_of_rows: 1,
            instructions: "[1 dec, 10 sc] * 2 (22)",
          },
          {
            row_start: 14,
            amount_of_rows: 8,
            instructions: "22 sc (22)",
          },
          {
            row_start: 22,
            amount_of_rows: 1,
            instructions: "[1 dec, 9 sc] * 2 (20)",
          },
          {
            row_start: 23,
            amount_of_rows: 8,
            instructions: "20 sc (20)",
          },
          {
            row_start: 31,
            amount_of_rows: 1,
            instructions: "[1 dec, 8 sc] * 2 (18)",
          },
          {
            row_start: 32,
            amount_of_rows: 1,
            instructions: "18 sc (18 sc)",
          },
          {
            row_start: 33,
            amount_of_rows: 1,
            instructions: "[1 dec, 7 sc] * 2 (16)",
          },
          {
            row_start: 34,
            amount_of_rows: 1,
            instructions: "16 sc (16)",
          },
          {
            row_start: 35,
            amount_of_rows: 1,
            instructions: "[1 dec, 6 sc] * 2 (14)",
          },
          {
            row_start: 36,
            amount_of_rows: 1,
            instructions: "14 sc (14)",
          },
          {
            row_start: 37,
            amount_of_rows: 1,
            instructions:
              "Add a piece of cardboard to the inside of your ear to keep it steady.",
          },
          {
            row_start: 38,
            amount_of_rows: 1,
            instructions:
              "Fasten off and cut the yarn, leaving a long tail for sewing onto the head at row 4-9. ",
          },
        ],
      },
      {
        part_id: 6,
        headline: "Inner Ears",
        notes:
          "Make 2, in pink yarn. At the end of every row in this pattern, ch 1 and turn",
        rows: [
          {
            row_start: 1,
            amount_of_rows: 1,
            instructions: "Ch 2, sc in 2nd loop from the hook (1)",
          },
          {
            row_start: 2,
            amount_of_rows: 1,
            instructions: "1 inc (2)",
          },
          {
            row_start: 3,
            amount_of_rows: 1,
            instructions: "2 sc (2)",
          },
          {
            row_start: 4,
            amount_of_rows: 1,
            instructions: "1 inc 2 sc (3)",
          },
          {
            row_start: 5,
            amount_of_rows: 11,
            instructions: "3 sc (3)",
          },
          {
            row_start: 16,
            amount_of_rows: 1,
            instructions: "1 dec, 1 sc (2)",
          },
          {
            row_start: 17,
            amount_of_rows: 2,
            instructions: "2 sc (2)",
          },
          {
            row_start: 19,
            amount_of_rows: 1,
            instructions: "1 dec (1)",
          },
          {
            row_start: 20,
            amount_of_rows: 1,
            instructions: "Sc all around the piece to make for a neater edge.",
          },
          {
            row_start: 21,
            amount_of_rows: 1,
            instructions:
              "Fasten off, cut enough of a tail for sewing the piece to the ear between row 7 and 30 on the ear. ",
          },
        ],
      },
      {
        part_id: 7,
        headline: "Legs",
        notes: "Make 2, in white yarn.",
        rows: [
          {
            row_start: 1,
            amount_of_rows: 1,
            instructions:
              "Ch 16, then starting in the 2nd loop from the hook, working in the round... (16)",
          },
          {
            row_start: 2,
            amount_of_rows: 1,
            instructions:
              "Sc 7, hdc 7, 3 hdc in 1 st, 7 hdc, 7 sc, 3 sc in 1 st (34)",
          },
          {
            row_start: 3,
            amount_of_rows: 1,
            instructions:
              "7 sc, 6 hdc, 5 hdcinc, 6 hdc, 8 sc, 3 sc in 1 st, 1 sc. (41)",
          },
          {
            row_start: 4,
            amount_of_rows: 1,
            instructions:
              "7 sc, 6 hdc, [1 hdcinc 1 hdc] * 5, 6 hdc, 8 sc, 3 inc, 1 sc. (49)",
          },
          {
            row_start: 5,
            amount_of_rows: 1,
            instructions:
              "7 sc, 6 hdc, 4 dc inc,1 sl st, 4 dc inc, 1 sl st, 4 dc inc, 6 hdc, 15 sc. (61)",
          },
          {
            row_start: 6,
            amount_of_rows: 1,
            instructions:
              "In BLO: 13 sc, In both loops: 4 sc, 4 inc, 1 sl st, 2 sc, 4 inc, 2 sc, 1 sl st, 4 inc, 4 sc, In BLO: 22 sc (73)",
          },
          {
            row_start: 7,
            amount_of_rows: 1,
            instructions: "25 sc, 1 sl st, 12 sc, 1 sl st, 34 sc (73)",
          },
          {
            row_start: 8,
            amount_of_rows: 1,
            instructions:
              "13 sc  [1 dec, 2 sc] * 3, sl st, [1 dec, 2 sc] * 3, sl st, [1 dec, 2 sc] * 3, 22 sc (64)",
          },
          {
            row_start: 9,
            amount_of_rows: 1,
            instructions:
              "13 sc  [1 dec, 1 sc] * 3, sl st, [1 dec, 1 sc] * 3, sl st, [1 dec, 1 sc] * 3, 22 sc (55)",
          },
          {
            row_start: 10,
            amount_of_rows: 1,
            instructions:
              "13 sc, 3 dec, sl st, 3 dec, sl st, 3 dec, 22 sc (46)",
          },
          {
            row_start: 11,
            amount_of_rows: 1,
            instructions: "1 sc, [1 dec, 4 sc] * 6, 1 dec, 7 sc (39)",
          },
          {
            row_start: 12,
            amount_of_rows: 1,
            instructions: " sc, [1 dec, 3 sc] * 6, 1 dec, 7 sc (32)",
          },
          {
            row_start: 13,
            amount_of_rows: 1,
            instructions:
              "2 sc, [1 dec, 1 sc] * 2, 5 dec, [1 dec, 1 sc] * 2, 8 sc (23)",
          },
          {
            row_start: 14,
            amount_of_rows: 1,
            instructions: "7 sc, 3 dec, 10 sc (20)",
          },
          {
            row_start: 15,
            amount_of_rows: 3,
            instructions: "20 sc (20)",
          },
          {
            row_start: 18,
            amount_of_rows: 1,
            instructions: "[1 dec, 8 sc] * 2 (18)",
          },
          {
            row_start: 19,
            amount_of_rows: 2,
            instructions: "18 sc (18)",
          },
          {
            row_start: 21,
            amount_of_rows: 1,
            instructions: "Stuff the foot",
          },
          {
            row_start: 22,
            amount_of_rows: 1,
            instructions: "6 sc, 3 inc, 3 sc, 3 dec (18)",
          },
          {
            row_start: 23,
            amount_of_rows: 1,
            instructions: "2 dec, 11 sc, 3 sl st (16)",
          },
          {
            row_start: 24,
            amount_of_rows: 1,
            instructions: "1 sl st, 12 sc, 3 sl st (16)",
          },
          {
            row_start: 25,
            amount_of_rows: 1,
            instructions: "1 sl st, 12 sc, 1 dec, 1 sc (15)",
          },
          {
            row_start: 26,
            amount_of_rows: 1,
            instructions: "1 dec, 13 sc (14)",
          },
          {
            row_start: 27,
            amount_of_rows: 1,
            instructions: "14 sc (14)",
          },
          {
            row_start: 28,
            amount_of_rows: 1,
            instructions: "[1 dec, 5 sc] * 2 (12)",
          },
          {
            row_start: 29,
            amount_of_rows: 2,
            instructions: "12 sc (12)",
          },
          {
            row_start: 31,
            amount_of_rows: 1,
            instructions: "12 sc (12)",
          },
          {
            row_start: 32,
            amount_of_rows: 1,
            instructions:
              "Stuff the leg, fasten off leaving a log tail for sewing the leg to the body starting from row 3. ",
          },
        ],
      },
      {
        part_id: 8,
        headline: "Toebeans",
        notes: "Make 6, in pink yarn.",
        rows: [
          {
            row_start: 1,
            amount_of_rows: 1,
            instructions: "4 sc in magic ring (4)",
          },
          {
            row_start: 2,
            amount_of_rows: 1,
            instructions: "4 inc (8)",
          },
          {
            row_start: 3,
            amount_of_rows: 1,
            instructions: "Fasten off and sew underneath toes",
          },
        ],
      },
      {
        part_id: 9,
        headline: "Heel Pad",
        notes: "Make 2, in pink yarn.",
        rows: [
          {
            row_start: 1,
            amount_of_rows: 1,
            instructions: "4 sc in magic ring (4)",
          },
          {
            row_start: 2,
            amount_of_rows: 1,
            instructions: "4 inc (8)",
          },
          {
            row_start: 3,
            amount_of_rows: 1,
            instructions: "[1 sc, 1 inc ] * 4 (12)",
          },
          {
            row_start: 4,
            amount_of_rows: 1,
            instructions: "Fasten off and sew underneath heal",
          },
          {
            row_start: 5,
            amount_of_rows: 1,
            instructions: "",
          },
        ],
      },
      {
        part_id: 10,
        headline: "Tail",
        notes: "Make in white yarn.",
        rows: [
          {
            row_start: 1,
            amount_of_rows: 1,
            instructions: "6 sc in mr (6)",
          },
          {
            row_start: 2,
            amount_of_rows: 1,
            instructions: "6 inc (12)",
          },
          {
            row_start: 3,
            amount_of_rows: 1,
            instructions: "12 sc (12)",
          },
          {
            row_start: 4,
            amount_of_rows: 1,
            instructions: "[1 dec, 2 sc] * 3 (9)",
          },
          {
            row_start: 5,
            amount_of_rows: 1,
            instructions:
              "Add stuffing, fasten off and cut yarn, leaving a long tail for sewing onto the back of the body at row 8-11.",
          },
        ],
      },
    ],
  };
  const submitNewToPatternDB = async (user_id: string) => {
    if (!user_id) {
      console.log("User ID not found in localStorage");
      return;
    }
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

  try {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      console.log("User ID not found in localStorage");
      return;
    }

    try {
      const response = await submitNewToPatternDB(user_id);
      if (response && response.length > 0) {
        await submitNewToPartsDB(response[0]);
      }
    } catch (error) {
      console.error("Error saving pattern and parts:", error);
    }
  } catch (error) {
    console.error("Error saving pattern and parts:", error);
  }
};
