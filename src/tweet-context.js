import React from "react";

const TweetsContext = React.createContext({
  tweets: [],
  addTweet: (tweet) => {},
  removeTweet: (id, username) => {},
  getTweets: (username) => {}
});

export default TweetsContext;
