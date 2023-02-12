import Card from "../../UI/Card";
import classes from "./HistoryItem.module.css";

const HistoryItem = (props) => {
  const { tweet, username, date, time, id } = props;

  const onClickHandle = (event) => {
    console.log("on click handler function in history item ");
    event.preventDefault();
    props.onRemoveTweet(id, username);
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <div className={classes.username}>{username}</div>
          <button onClick={onClickHandle}>delete</button>
        </header>
        <h3>{tweet}</h3>
        <div>
          <p>
            {time} | {date}
          </p>
        </div>
      </Card>
    </li>
  );
};

export default HistoryItem;
