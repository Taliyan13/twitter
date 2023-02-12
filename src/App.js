import { Fragment, useContext, useEffect, useState } from "react";
import "./index.css";
import OpenPage from "./components/OpenPage/OpenPage";
import NewTweets from "./components/NewTweets/NewTweets";
import HistoryTweets from "./components/HistoryTweets/HistoryTweets";
import classes from "./components/HistoryTweets/HistoryTweets.module.css";
import TweetProvider from "./TweetReducer";
import TweetsContext from "./tweet-context";
import Toolbar from "@material-ui/core/Toolbar";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "400px",
    overflowY: "scroll"
  }
});

function App() {
  const [openPage, setOpenPage] = useState(true);
  const [tweets, setTweets] = useState([]); //for data list
  const [isLoading, setIsLoading] = useState(true);
  const [noTweetsData, setNoTweetData] = useState(false);
  const [username, setUsername] = useState();
  const ctx = useContext(TweetsContext);
  const scrollClasses = useStyles();

  //function came from NewTweet.js file, when user click on "Tweet" button.
  async function addTweetHandler(tweet) {
    const response = await fetch(
      "https://react-twitter-app-77178-default-rtdb.firebaseio.com/tweets.json",
      {
        method: "POST",
        body: JSON.stringify(tweet),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();
    console.log(data);
    ctx.addTweet(tweet);
  }

  // function for remove tweets from list and db
  async function deleteTweetHandler(id, username) {
    console.log("on delete tweet function in APP");
    console.log(id);
    fetch(
      `https://react-twitter-app-77178-default-rtdb.firebaseio.com/tweets/${id}.json`,
      {
        method: "DELETE"
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // handle the response
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    ctx.removeTweet(id, username);
  }

  useEffect(() => {
    //console.log("app");
    //console.log(username);
    const fetchTweets = async () => {
      //sent with GET request
      const response = await fetch(
        "https://react-twitter-app-77178-default-rtdb.firebaseio.com/tweets.json"
      );

      //catch http erros
      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const responseData = await response.json();
      const loadedTweets = [];
      //console.log(username);
      for (const key in responseData) {
        if (responseData[key].username === username) {
          loadedTweets.push({
            id: key,
            username: responseData[key].username,
            time: responseData[key].time,
            date: responseData[key].date,
            tweet: responseData[key].tweet
          });
        }
      }

      //if there is no data from DB (no tweets)
      if (loadedTweets.length === 0) {
        setNoTweetData(true);
      }
      // by date order
      setTweets(
        loadedTweets.sort((a, b) => new Date(b.date) - new Date(a.date))
      );

      setIsLoading(false); //done to load
    };
    //first, we check that usename moved from OpenPage to props, and then will call to fetchTweets()
    if (username) {
      fetchTweets().catch((error) => {
        console.log(error);
        //setHttpError(error.message);
      });
    }
  }, [tweets, username]);

  //when the user click on "tweet something" the twitter page will open
  function openPageClickHandle(username) {
    console.log("openPageClickHandle app function");
    setOpenPage(false);
    setUsername(username);
  }

  return (
    <Fragment>
      {openPage && <OpenPage openPageClick={openPageClickHandle}></OpenPage>}
      <TweetProvider>
        {!openPage && (
          <>
            <div className="container">
              <Toolbar>
                <div className="newTweets">
                  <NewTweets
                    onAddTweet={addTweetHandler}
                    username={username}
                  ></NewTweets>
                </div>
              </Toolbar>
              {isLoading ? (
                <section className={classes.tweetLoading}>
                  <p>Loading...</p>
                </section>
              ) : (
                <>
                  {noTweetsData ? (
                    <section className={classes.nodata}>
                      <p>Be the first tweet!</p>
                    </section>
                  ) : (
                    <div className="historyTweets">
                      <PerfectScrollbar className={scrollClasses.root}>
                        <HistoryTweets
                          tweets={tweets}
                          onRemoveTweet={deleteTweetHandler}
                        ></HistoryTweets>
                      </PerfectScrollbar>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </TweetProvider>
    </Fragment>
  );
}

export default App;
