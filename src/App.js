import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import NewsCards from "./component/NewsCards/NewsCards";
import Img from "./Voice Assistant News App (1).png";
const alankey =
  "d23f50021fa9e4a9f57e453f91d7d4022e956eca572e1d8b807a3e2338fdd0dc/stage";
const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  useEffect(() => {
    alanBtn({
      key: alankey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parseNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parseNumber - 1];
          if (parseNumber > 20) {
            alanBtn().playText("Please try that again");
          } else if (article) {
            window.open(articles[number].url, "_blank");
            alanBtn().playText("Opening...");
          }
        }
      },
    });
  }, []);
  return (
    <div>
      <div
        style={{
          padding: "0 5%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img src={Img} alt="alan logo"
          style={{
           
            height: "30vh",
            borderRadius: "50px",
            padding: "20px",
            margin: " 0",
          }}
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};
export default App;
