import React, { useEffect } from "react";
import QuizForm from "./QuizForm";
import axios from "axios";
import { connect } from "react-redux";
import Loading from "./Loading";
import QuizQuestion from "./QuizQuestion";
import Modal from "./Modal";

function App({ isLoading, isWaiting, showModal, getCategory }) {
  useEffect(() => {
    if (isWaiting) getCategory();
  }, [isWaiting, getCategory]);

  if (isLoading) {
    return <Loading />;
  }
  if (isWaiting) {
    return <QuizForm />;
  }
  return (
    <main>
      <section className="section-center">
        <QuizQuestion />
        {showModal && <Modal />}
      </section>
    </main>
  );
}

const mapStateToProps = (state) => {
  const { isLoading, quizForm, isWaiting, questions, showModal } = state;
  return {
    isLoading,
    quizForm,
    isWaiting,
    questions,
    showModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: () => {
      dispatch({ type: "SET_LOADING", payload: { value: true } });
      dispatch({ type: "SET_WAITING", payload: { value: true } });

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
