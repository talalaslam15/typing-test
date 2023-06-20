import { useEffect, useRef, useState } from "react";
import randomWords from "random-words";
import SettingsButton from "./SettingsButton";
import ResetIcon from "./ResetIcon";
import Words from "./Words";
import "./App.css";
// import SettingsDialog from "./SettingsDialog";

function App() {
  const [wordsLength, setWordsLength] = useState<number>(10);
  const [words, setWords] = useState<string>(
    randomWords(wordsLength).join(" ")
  );
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const currentLetter = words[currentLetterIndex];
  const [inCorrectLetters, setInCorrectLetters] = useState<number[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(0);
  const [correctLetters, setCorrectLetters] = useState<number>(0);
  const containerRef = useRef<HTMLButtonElement>(null);
  // const [open, setOpen] = useState<boolean>(false);
  // const [ignoreMistakes, setIgnoreMistakes] = useState<boolean>(false);

  const reset = () => {
    setCurrentLetterIndex(0);
    setInCorrectLetters([]);
    setElapsedTime(0);
    setStart(false);
    setIsComplete(false);
  };
  const restart = () => {
    setCorrectLetters(words.length - inCorrectLetters.length);
    setWords(randomWords(wordsLength).join(" "));
    setInCorrectLetters([]);
    setCurrentLetterIndex(0);
    setIsComplete(true);
    setStart(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (currentLetterIndex === 0 && e.key === currentLetter) {
      setElapsedTime(0);
      setIsComplete(false);
      setStart(true);
    }
    if (e.key === "Tab") {
      e.preventDefault();
      containerRef.current?.focus();
    }
    if (e.key === currentLetter) {
      setCurrentLetterIndex((prevIndex) => prevIndex + 1);
    } else {
      setInCorrectLetters((prev) =>
        prev.includes(currentLetterIndex) ? prev : [...prev, currentLetterIndex]
      );
      // ignoreMistakes && setCurrentLetterIndex((prevIndex) => prevIndex + 1);
    }
    // if (ignoreMistakes && e.key === "Backspace") {
    //   setCurrentLetterIndex((prevIndex) => prevIndex - 1);
    //   setInCorrectLetters((prev) => prev.slice(0, prev.length - 1));
    // }
    if (e.key === "Escape") {
      reset();
    }
    if (currentLetterIndex === words.length - 1 && e.key === currentLetter) {
      restart();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentLetterIndex]);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [start]);

  useEffect(() => {
    isComplete &&
      setWpm(Number(((correctLetters / 5 / elapsedTime) * 60).toFixed(2)));
  }, [isComplete]);

  // useEffect(() => {
  //   setWords(randomWords(wordsLength).join(" "));
  //   reset();
  // }, [wordsLength]);

  return (
    <div className="App">
      {/* <SettingsButton setOpen={() => setOpen(true)} /> */}
      <Words
        words={words}
        currentLetterIndex={currentLetterIndex}
        inCorrectLetters={inCorrectLetters}
      />
      Speed: {wpm} wpm
      <ResetIcon reset={reset} containerRef={containerRef} />
      {/* <SettingsDialog
        open={open}
        onClose={() => setOpen(false)}
        ignoreMistakes={ignoreMistakes}
        setIgnoreMistakes={(val) => setIgnoreMistakes(val)}
        wordsLength={wordsLength}
        setWordsLength={(val) => setWordsLength(val)}
      /> */}
    </div>
  );
}

export default App;
