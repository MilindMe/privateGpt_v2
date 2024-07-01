import React, { useEffect, useState } from "react";

const Typewriter = () => {
  const words = ["Hello, World!", "Welcome to my website!", "This is a typewriter effect."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const handleType = () => {
      const currentWord = words[currentWordIndex];

      if (isDeleting) {
        setDisplayText(currentWord.substring(0, currentTextIndex - 1));
        setCurrentTextIndex(currentTextIndex - 1);

        if (currentTextIndex - 1 === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      } else {
        setDisplayText(currentWord.substring(0, currentTextIndex + 1));
        setCurrentTextIndex(currentTextIndex + 1);

        if (currentTextIndex + 1 === currentWord.length) {
          setIsDeleting(true);
        }
      }
    };

    const typingTimeout = setTimeout(handleType, 100);

    return () => clearTimeout(typingTimeout);
  }, [displayText, currentTextIndex, isDeleting, currentWordIndex, words]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 id="typewriter" className="text-4xl font-bold">{displayText}</h1>
    </div>
  );
};

export default Typewriter;
