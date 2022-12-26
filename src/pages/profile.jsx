import React from "react";
import Card from "../components.js/card";
import "../css/profile.css";
import { UserAuth } from "../context/AuthContext";

function Profile() {
  const { user } = UserAuth();
  const tenSeonds = [];
  const twentyFiveSeconds = [];
  const fiftySeconds = [];
  let averageSpeed = 0;

  const data = JSON.parse(localStorage.getItem("totalmatch"));
  if (data) {
    for (let item of data) {
      const { matchWords, speed } = item;

      averageSpeed += speed;

      if (+matchWords == 10) tenSeonds.push(item);
      else if (+matchWords == 25) twentyFiveSeconds.push(item);
      else fiftySeconds.push(item);
    }
  }

  const allTensecondsMatch = tenSeonds.map((item, index) => (
    <Card key={+item.totalCharacter + index + item.id} details={item} />
  ));

  const all25secondsMatch = twentyFiveSeconds.map((item, index) => (
    <Card key={+item.totalCharacter + index + item.id} details={item} />
  ));

  const allFiftysecondsMatch = fiftySeconds.map((item, index) => (
    <Card key={+item.totalCharacter + index + item.id} details={item} />
  ));

  return (
    <article className="container">
      <section id="personal-details">
        <section className="user-details">
          {user?.photoURL ? (
            <img
              className="user-display-picture"
              src={user.photoURL}
              alt="user picture"
            />
          ) : (
            <span className="user-icon material-symbols-outlined">
              account_circle
            </span>
          )}
          <h2>{user.displayName}</h2>
        </section>

        <section className="typing-speed">
          <div className="number-of-match">
            <h1>Total test completed</h1>
            <h1 className="test-completed">{data ? data?.length : 0}</h1>
          </div>

          <div className="number-of-match">
            <h1>Average typing speed </h1>
            <h1 className="average-speed">
              {data ? Math.floor(averageSpeed / data?.length) : 0} wpm
            </h1>
          </div>
        </section>
      </section>

      <section className="typing-stats">
        <section className="card-wrapper">
          <h2>10s match</h2>
          <div className="card-container">
            {allTensecondsMatch.length > 0
              ? allTensecondsMatch
              : "No matched Played"}
          </div>
        </section>

        <section className="card-wrapper">
          <h2>25s match</h2>
          <div className="card-container">
            {all25secondsMatch.length > 0
              ? all25secondsMatch
              : "No match played"}
          </div>
        </section>

        <section className="card-wrapper">
          <h2>50s match</h2>
          <div className="card-container">
            {allFiftysecondsMatch.length > 0
              ? allFiftysecondsMatch
              : "No match played"}
          </div>
        </section>
      </section>
    </article>
  );
}
export default Profile;
