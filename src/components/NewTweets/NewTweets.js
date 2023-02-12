//import React, {  useEffect, useReducer } from "react";
import { useRef, useState } from "react";
import Card from "../../UI/Card";
import classes from "./NewTweets.module.css";

const NewTweets = (props) => {
  const authorName = props.username;
  const [text, setText] = useState("What should I tweet about next..?");
  const [letterCounter, setLetterCounter] = useState(246);
  var today = new Date();

  const textChange = useRef("");
  //refresh loadedTweets list after insert new tweet

  const handleKeyDown = (event) => {
    if (letterCounter === 246 && event.key === "Backspace") {
      //event.preventDefault();
      return;
    }
    if (event.key === "Backspace") {
      setLetterCounter(letterCounter + 1);
    } else {
      setLetterCounter(letterCounter - 1);
    }
  };

  //every click, we send POST request with tweet reference, hour and date to DB
  const handleOnClickButton = (event) => {
    event.preventDefault();
    console.log("output - " + text);
    var ampm = today.getHours() >= 12 ? "pm" : "am";

    const addNewTwett = {
      date:
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate(),
      time: today.getHours() + ":" + today.getMinutes() + " " + ampm,
      tweet: textChange.current.value,
      username: authorName
    };

    props.onAddTweet(addNewTwett);
    //textChange.current.value = "";
    setText("What should I tweet about next..?");
    setLetterCounter(246);
  };

  return (
    <div style={{ marginRight: "15px" }}>
      <Card>
        <form>
          <div>
            <label htmlFor="text" className={classes.username}>
              {authorName}
            </label>
          </div>

          <div>
            <textarea
              type="text"
              ref={textChange}
              value={text}
              onFocus={() => setText("")}
              onChange={(e) => {
                setText(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            ></textarea>
          </div>
          <div className={classes.buttonDiv}>
            <span
              className={classes.lettercounter}
              style={{ color: letterCounter < 0 ? "red" : "black" }}
            >
              {letterCounter}
            </span>
            <span style={{ marginTop: "10px" }}> | </span>
            <span>
              <button onClick={handleOnClickButton}>Tweet</button>
            </span>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewTweets;
