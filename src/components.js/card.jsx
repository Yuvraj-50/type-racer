import React from "react";
import "../css/profile.css";

function Card({ details }) {
  const {
    accuracy,
    correctLetters,
    inCorrectLetters,
    matchWords,
    speed,
    timeTaken,
    totalCharacter,
  } = details;

  return (
    <div className="card">
      <ul className="details-wrapper">
        <li> Your speed : {speed} wpms </li>
        <li> Your Accuracy : {Math.floor(accuracy)}</li>
        <li> Total characteres : {totalCharacter}</li>
        <li> correct Typed : {correctLetters} </li>
        <li> inCorrect Typed : {inCorrectLetters} </li>
        <li> Total words : {matchWords} </li>
        <li> Total time taken : {timeTaken} sec </li>
      </ul>
    </div>
  );
}

export default Card;
