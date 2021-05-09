import React, { useEffect } from "react";
import QuizForm from "./QuizForm";
import axios from "axios";
import { connect } from "react-redux";
import Loading from "./Loading";

function App({ isLoading, getCategory }) {
  useEffect(() => {
    getCategory();
  }, [getCategory]);

  if (isLoading) {
    return <Loading />;
  }

  return <QuizForm />;
}

const mapStateToProps = (state) => {
  const { isLoading } = state;
  return {
    isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: () => {
      dispatch({ type: "SET_LOADING", payload: { value: true } });
      axios
        .get("https://opentdb.com/api_category.php")
        .then((response) => {
          dispatch({
            type: "ADD_CATEGORIES",
            payload: { categories: response.data.trivia_categories },
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          dispatch({ type: "SET_LOADING", payload: { value: false } });
        });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
