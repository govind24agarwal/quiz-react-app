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
    return { ...state, categories: action.payload.categories };
  }

  return state;
};

export default reducer;
