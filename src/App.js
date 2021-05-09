import React, { useEffect } from "react";
import QuizForm from "./QuizForm";
import axios from "axios";
import { connect } from "react-redux";

function App({ getCategory }) {
  useEffect(() => {
    getCategory();
  }, [getCategory]);

  return <QuizForm />;
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: () => {
      axios.get("https://opentdb.com/api_category.php").then((response) => {
        dispatch({
          type: "ADD_CATEGORIES",
          payload: { categories: response.data.trivia_categories },
        }).catch((error) => {
          console.log(error);
        });
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
