export const initialState = {
  onOff: true,
  postAnswerSuccess: 0,
  username: "",
  userid: null,
  questionData: {},
};
const reducer = (state, action) => {
    console.log(action)
  switch (action.type) {
    case "CHANGE_FORM":
      if (state.onOff === false) {
        return {
          ...state,
          onOff: true,
        };
      } else {
        return {
          ...state,
          onOff: false,
        };
      }
    case "SET_USER":
      return {
        ...state,
        username: action.item.username,
        userid: action.item.userid,
      };
    case "REMOVE_USER":
      return {
        ...state,
        userid: null,
      };
    case "SET_QUESTION_DATA":
      return {
        ...state,
        questionData: action.item,
      };
      case "POST_ANSWER_SUCCESS":
        return {
          ...state,
          postAnswerSuccess: state.postAnswerSuccess + 1,
        };

    default:
      return state;
  }
};

export default reducer;
