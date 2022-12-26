import React from "react";
import { useState } from "react";
import { useRef, useEffect } from "react";
import "../css/typer.css";
import "../css/showResult.css";
import audio from "../assest/keypress.wav";
function Typer({ paragraph }) {
  //  creating elements for invidiual letters

  const [totalWords, setTotalWords] = useState(50);

  const [totalMatches, setTotalMatches] = useState([]);

  let timerInterval;
  let start = false;

  // for dynamically displaying the words;
  const paragraphGiven = paragraph
    .split(" ")
    .slice(0, totalWords)
    .join(" ")
    .split("");

  const para = paragraphGiven.map((char, idx) => {
    if (idx == 0) {
      return (
        <span className="start letter" key={idx}>
          {char}
        </span>
      );
    } else {
      return (
        <span className="letter" key={idx}>
          {char}
        </span>
      );
    }
  });

  // for quote element that we display on the screen
  const quoteElement = useRef();

  // for input element that will be hidden
  const inputElement = useRef();

  // for timer element
  const timerElement = useRef();

  let arrayQuote;

  useEffect(() => {
    function handleKeydown() {
      if (!start) {
        startTimer();
        start = true;
      }

      const sound = new Audio(audio);
      sound.play();
      inputElement.current.focus();
    }

    document.addEventListener("keydown", handleKeydown);

    let startTime;

    function startTimer() {
      startTime = new Date();

      timerInterval = setInterval(() => {
        timerElement.current.textContent = gettime();
      }, 1000);
    }

    // document.addEventListener("click", (e) => {
    //   if (e.target.classList.contains("newmatch")) {
    //     window.location.reload();
    //   }
    // });

    function gettime() {
      return Math.floor((new Date() - startTime) / 1000);
    }
    // clean up function use effects
    return function () {
      document.removeEventListener("keydown", handleKeydown);
      clearInterval(timerInterval);
    };
  }, []);

  function getRandomId() {
    return Math.random() * 100997799;
  }

  // event handlers

  // words word handlers
  const customization = useRef();

  function handleClick(e) {
    customization.current
      .querySelectorAll("li")
      .forEach((ele) => ele.classList.remove("time-selected"));
    e.target.classList.add("time-selected");

    setTotalWords(+e.target.textContent);
  }

  // function for comparing value between input and the quote
  function handleChange(e) {
    arrayQuote = quoteElement.current.querySelectorAll(".letter");

    const arrayValue = e.target.value.split("");

    // if the program is finished executed
    if (arrayValue.length == para.length) {
      let totalLetter = 0;
      let score = 0;

      arrayQuote.forEach((elem) => {
        if (elem.classList.contains("correct")) {
          score++;
        } else {
          score--;
        }
        totalLetter++;
      });

      if (timerInterval) {
        clearInterval(timerInterval);
      }

      const Gross_speed =
        (totalLetter - 2) / 5 / (+timerElement.current.textContent / 60) -
        (totalLetter - 2 - score) / 5;

      const net_speed =
        (totalLetter - 2) / 5 / (+timerElement.current.textContent / 60);

      const accuracy = (Gross_speed * 100) / net_speed;

      const data = localStorage.getItem("totalmatch");

      const matchData = {
        totalCharacter: totalLetter - 2,
        correctLetters: Math.max(score, 0),
        inCorrectLetters: totalLetter - 2 - score,
        matchWords: totalWords,
        timeTaken: +timerElement.current.textContent,
        speed: Math.floor(Gross_speed),
        accuracy: accuracy,
        id: getRandomId(),
      };

      if (data) {
        let newData = JSON.parse(data);
        newData.push(matchData);
        localStorage.setItem("totalmatch", JSON.stringify(newData));
      } else {
        localStorage.setItem("totalmatch", JSON.stringify([matchData]));
      }

      quoteElement.current.innerHTML = `
          <div class="results">
            <h1> Contratulations you have completed the Challage </h1>
            <h2> Here are the stats </h2>
            <ul class="showresultul">
              <li> Your speed : ${Math.floor(Gross_speed)} wpm </li>
              <li> Your Accuracy : ${Math.floor(accuracy)} % </li>
              <li> Total characteres : ${totalLetter - 2}</li>
              <li> correct Typed  : ${Math.max(score, 0)} </li>
              <li> inCorrect Typed : ${totalLetter - 2 - score} </li>
              <li> Total words : ${totalWords} </li>
              <li> Total time taken : ${
                timerElement.current.textContent
              } sec </li>
              <a href="./" class="newmatch">New match</a>
            </ul>

            
          </div>`;

      setTotalMatches((prev) => {
        return [...prev, matchData];
      });
      return;
    }

    // some shity code to fix the caret at the start never mind
    if (arrayValue.length == 0) {
      arrayQuote.forEach((char) => char.classList.remove("active"));
      arrayQuote.forEach((char) => char.classList.remove("correct"));
      arrayQuote.forEach((char) => char.classList.remove("incorrect"));
      arrayQuote[0].classList.add("start");
      return;
    }
    if (arrayQuote[0].classList.contains("start")) {
      arrayQuote[0].classList.remove("start");
    }

    arrayQuote.forEach((char, index) => {
      // inputElement.current.focus();
      const character = arrayValue[index];
      // matching the user strings and the paragraph string
      if (character == null) {
        char.classList.remove("correct");
        char.classList.remove("incorrect");
      } else if (char.textContent === character) {
        char.classList.add("correct");
        char.classList.remove("incorrect");

        // active cursor
        arrayQuote.forEach((char) => char.classList.remove("active"));
        char.classList.add("active");
      } else {
        char.classList.add("incorrect");
        char.classList.remove("correct");

        // active cursor
        arrayQuote.forEach((char) => char.classList.remove("active"));
        char.classList.add("active");
      }
    });
  }

  // returning the created components
  return (
    <div className="text-container container" ref={quoteElement}>
      <input
        className="inputElement"
        type="text"
        onChange={handleChange}
        ref={inputElement}
      />
      <section className="customization">
        <div className="wrapper">
          <p>Words</p>
          <ul className="customization-items" ref={customization}>
            <li onClick={handleClick}>10</li>
            <li onClick={handleClick}>25</li>
            <li onClick={handleClick} className="time-selected">
              50
            </li>
          </ul>
        </div>
      </section>

      <section className="para-container">
        <h1 ref={timerElement} className="timer">
          0
        </h1>
        {para}
      </section>
    </div>
  );
}

export default Typer;
