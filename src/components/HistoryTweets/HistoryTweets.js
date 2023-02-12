import HistoryItem from "./HistoryItem";
import classes from "./HistoryTweets.module.css";
import Card from "../../UI/Card";
//
const HistoryTweets = (props) => {
  function onRemoveTweet(id, username) {
    console.log("on Remove tweet function in HistoryTweets.js ");
    props.onRemoveTweet(id, username);
  }

  const tweetsList = props.tweets.map((t) => (
    <HistoryItem
      id={t.id}
      key={t.id}
      username={t.username}
      tweet={t.tweet}
      time={t.time}
      date={t.date}
      onRemoveTweet={onRemoveTweet}
    />
  ));

  return (
    <div className={classes.mainDiv}>
      <Card>
        <section className={classes.products}>
          <div className={classes.listScroll}>
            <ul>{tweetsList}</ul>
          </div>
        </section>
      </Card>
    </div>
  );
};

export default HistoryTweets;
