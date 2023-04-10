import { useEffect, useState } from "react";
import "./App.css";
import randomWords from "random-words";

function App() {
  const [words, setWords] = useState<string>(randomWords(10).join(" "));
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const currentLetter = words[currentLetterIndex];
  const [inCorrectLetters, setInCorrectLetters] = useState<number[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(0);
  // const [ignoreMistakes, setIgnoreMistakes] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentLetterIndex === 0 && e.key === currentLetter) {
        setElapsedTime(0);
        setIsComplete(false);
        setStart(true);
      }
      if (e.key === currentLetter) {
        setCurrentLetterIndex((prevIndex) => prevIndex + 1);
      } else {
        setInCorrectLetters((prev) => {
          if (prev.includes(currentLetterIndex)) {
            return prev;
          } else {
            return [...prev, currentLetterIndex];
          }
        });
        // ignoreMistakes && setCurrentLetterIndex((prevIndex) => prevIndex + 1);
      }
      if (e.key === "Escape") {
        setCurrentLetterIndex(0);
        setInCorrectLetters([]);
        setElapsedTime(0);
        setStart(false);
        setIsComplete(false);
      }
      if (currentLetterIndex === words.length - 1 && e.key === currentLetter) {
        setWords(randomWords(10).join(" "));
        setInCorrectLetters([]);
        setCurrentLetterIndex(0);
        setIsComplete(true);
        setStart(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentLetterIndex]);

  useEffect(() => {
    if (start) {
      if (isComplete) {
        setStart(false);
        return;
      }
      const interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [start, isComplete]);

  useEffect(() => {
    if (isComplete) {
      const wordArray = words.split(" ");
      const numWords = wordArray.length;
      setWpm(Number(((numWords / elapsedTime) * 60).toFixed(2)));
    }
  }, [isComplete, words]);

  return (
    <div className="App">
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
      <h1>{currentLetter === " " ? "space" : currentLetter}</h1>
      Speed: {wpm} wpm
    </div>
  );
}

export default App;
