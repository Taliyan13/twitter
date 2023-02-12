import { useContext, useRef } from "react";
import Classes from "./OpenPage.module.css";
//import TweetsContext from "../../tweet-context";

const OpenPage = (props) => {
  const usernameInput = useRef("");
  //console.log(usernameInput.current.value);
  //const ctx = useContext(TweetsContext);

  const onClickHandler = () => {
    props.openPageClick(usernameInput.current.value);
    console.log(
      "username from openPage component" + usernameInput.current.value
    );
    //ctx.getTweets(usernameInput.current.value);
  };

  return (
    <div className={Classes.openpage}>
      <h1>Welcome to Twitter!</h1>
      <span>
        this is the best place to see what's happening in your world. Find some
        people and topics to follow now.
      </span>
      <div className={Classes.username}>
        <input type="text" name="name" ref={usernameInput} />
      </div>
      <button onClick={onClickHandler}>Tweet something!</button>
    </div>
  );
};

export default OpenPage;
