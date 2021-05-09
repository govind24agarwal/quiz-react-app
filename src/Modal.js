import React from "react";
import { connect } from "react-redux";
function Modal({ nbCorrect, questions, startAgain }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>
          You have answered {nbCorrect} out of {questions.length} answers
          correct
        </h2>
        <button className="btn" onClick={startAgain}>
          Play again
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { nbCorrect, questions } = state;
  return { nbCorrect, questions };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startAgain: () => {
      dispatch({ type: "SET_WAITING", payload: { value: true } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
