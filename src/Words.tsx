import React from "react";
type WordsProps = {
  words: string;
  inCorrectLetters: number[];
  currentLetterIndex: number;
};
const Words = ({ words, inCorrectLetters, currentLetterIndex }: WordsProps) => {
  return (
    <h2 style={{ fontWeight: 400 }}>
      {words.split("").map((letter, index) => (
        <span
          key={index}
          style={{
            padding: "3px",
            color: inCorrectLetters.includes(index)
              ? "#e0564a"
              : index < currentLetterIndex
              ? "#34eb7d"
              : "white",
            backgroundColor: index === currentLetterIndex ? "#fff4" : "",
          }}
        >
          {letter}
        </span>
      ))}
    </h2>
  );
};

export default Words;
