import React, { useReducer } from "react";
import TweetsContext from "./tweet-context";

//initial state for tweets provider.
const initialState = {
  tweets: []
};

//set dispatch function changes
const TweetReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingTweetIndex = state.tweets.findIndex(
      (tweet) => tweet.id === action.tweet.id
    );
    //find the existing tweet in tweets array
    const existingTweet = state.tweets[existingTweetIndex];
    let updatedListOfTweets;

    // if we found tweet with same id in teets array
    if (existingTweet) {
      const updatedTweet = {
        ...existingTweet
      };
      updatedListOfTweets = [...state.tweets];
      updatedListOfTweets[existingTweetIndex] = updatedTweet;
    }

    // if its a new tweet
    else {
      updatedListOfTweets = state.items.concat(action.tweet);
    }

    return {
      tweets: updatedListOfTweets
    };
  }

  if (action.type === "REMOVE") {
    //find the index of the same id tweet
    console.log("on TweetProvider - action.type = delete");
    const existingTweetIndex = state.tweets.findIndex(
      (tweet) =>
        tweet.id === action.tweet.id && tweet.username === action.tweet.username
    );

    //find the existing tweet in tweets array
    const existingTweet = state.tweets[existingTweetIndex];
    let updatedListOfTweets; //new update list of tweets

    // if the id exsists in tweets array
    if (existingTweet) {
      //gives us new array with no the specific tweet.
      updatedListOfTweets = state.tweets.filter(
        (tweet) => tweet.id !== action.id
      );
    }

    return {
      tweets: updatedListOfTweets
    };
  }

  if (action.type === "GET") {
    const existingTweetIndex = state.tweets.findIndex(
      (tweet) => tweet.username === action.tweet.username
    );
    const existingTweet = state.tweets[existingTweetIndex];
    let updatedListOfTweets;
    // if we found tweet with same id in teets array
    if (existingTweet) {
      const updatedTweet = {
        ...existingTweet
      };
      updatedListOfTweets = [...state.tweets];
      updatedListOfTweets[existingTweetIndex] = updatedTweet;
    }
    return {
      tweets: updatedListOfTweets
    };
  }
};

// listen to Context
const TweetProvider = (props) => {
  //call to reducer - manage the state and dispatch function for all actions
  const [TweetState, dispatchAction] = useReducer(TweetReducer, initialState);

  const addTweetHandler = (tweet) => {
    console.log("dispatch - add");
    dispatchAction({ type: "ADD", tweet: tweet });
  };
  const removeTweetHandler = (id, username) => {
    console.log("dispatch - remove");
    dispatchAction({ type: "REMOVE", id: id, username: username });
  };
  const getTweetHandler = (username) => {
    dispatchAction({ type: "GET", username: username });
  };

  const tweetContext = {
    tweets: TweetState.tweets,
    addTweet: addTweetHandler,
    removeTweet: removeTweetHandler,
    getTweets: getTweetHandler
  };

  return (
    <TweetsContext.Provider value={tweetContext}>
      {props.children}
    </TweetsContext.Provider>
  );
};

export default TweetProvider;
