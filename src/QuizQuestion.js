import React from "react";
import { connect } from "react-redux";

function QuizQuestion({
  questions,
  nbCorrect,
  index,
  nextQuestion,
  checkAnswer,
}) {
  const question = questions[index];
  let answers = [];
  let ansIndex = 0;
  (function shuffleAnswers() {
    const { incorrect_answers, correct_answer } = question;
    ansIndex = Math.floor(4 * Math.random());
    answers = [
      ...incorrect_answers.slice(0, ansIndex),
      correct_answer,
      ...incorrect_answers.slice(ansIndex, 4),
    ];
  })();
  return (
    <div className="question">
      <div className="correct">
        <p>
          Correct Answers: {nbCorrect}/{index}
        </p>
      </div>
      <h3>{question.question}</h3>
      <div className="answers">
        {answers.map((answer, itemIndex) => {
          return (
            <button
              key={itemIndex}
              className="btn"
              onClick={() => {
                checkAnswer(ansIndex === itemIndex);
              }}
            >
              {answer}
            </button>
          );
        })}
      </div>

      <div className="skip-btn-container">
        <button className="btn" onClick={nextQuestion}>
          Skip
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { questions, nbCorrect, index } = state;

  return { questions, nbCorrect, index };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nextQuestion: () => dispatch({ type: "NEXT_QUESTION" }),
    checkAnswer: (correct) =>
      dispatch({ type: "CHECK_ANSWER", payload: { correct } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizQuestion);
