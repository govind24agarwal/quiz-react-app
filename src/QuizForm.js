import React from "react";
import { connect } from "react-redux";
import axios from "axios";

function QuizForm({ quizForm, categories, handleChange, startQuiz }) {
  const { number, category, difficulty } = quizForm;
  return (
    <div className="section-center">
      <div className="quiz-form-div">
        <h2>Setup Quiz</h2>
        <form
          className="quiz-form"
          onSubmit={(e) => {
            e.preventDefault();
            startQuiz(quizForm);
          }}
        >
          <label name="number">Number Of Questions</label>
          <input
            name="number"
            type="number"
            value={number}
            onChange={(e) => {
              if (e.target.value > 0) handleChange(e.target);
            }}
          />
          <label name="category">Category</label>
          <select
            name="category"
            value={category}
            onChange={(e) => handleChange(e.target)}
          >
            {categories.map((item) => {
              const { id, name } = item;
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
          <label name="difficulty">Difficulty</label>
          <select
            name="difficulty"
            value={difficulty}
            onChange={(e) => handleChange(e.target)}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
          <button type="submit" className="btn">
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => {
  const { quizForm, categories } = store;
  return { quizForm, categories };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange(target) {
      const { name, value } = target;
      dispatch({ type: "QUIZ-FORM-CHANGE", payload: { name, value } });
    },
    startQuiz: (quizForm) => {
      const { number, category, difficulty } = quizForm;
      dispatch({ type: "SET_WAITING", payload: { value: false } });
      dispatch({ type: "SET_LOADING", payload: { value: true } });
      axios
        .get(
          `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple`
        )
        .then((response) => {
          dispatch({
            type: "SET_QUESTIONS",
            payload: { questions: response.data.results },
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

export default connect(mapStateToProps, mapDispatchToProps)(QuizForm);
