const reducer = (state, action) => {
  // console.log(action, state);
  if (action.type === "QUIZ-FORM-CHANGE") {
    const { quizForm } = state;
    return {
      ...state,
      quizForm: { ...quizForm, [action.payload.name]: action.payload.value },
    };
  }
  if (action.type === "ADD_CATEGORIES") {
    return {
      ...state,
      nbCorrect: 0,
      index: 0,
      showModal: false,
      isWaiting: true,
      categories: action.payload.categories,
    };
  }
  if (action.type === "SET_LOADING") {
    return { ...state, isLoading: action.payload.value };
  }
  if (action.type === "SET_WAITING") {
    return { ...state, isWaiting: action.payload.value };
  }
  if (action.type === "SET_QUESTIONS") {
    return {
      ...state,
      questions: action.payload.questions,
    };
  }
  if (action.type === "NEXT_QUESTION") {
    return { ...state, index: state.index + 1 };
  }
  if (action.type === "CHECK_ANSWER") {
    const correct = action.payload.correct ? 1 : 0;
    if (state.index === state.questions.length - 1) {
      return {
        ...state,
        nbCorrect: state.nbCorrect + correct,
        showModal: true,
      };
    }
    return {
      ...state,
      nbCorrect: state.nbCorrect + correct,
      index: state.index + 1,
    };
  }
  return state;
};

export default reducer;
