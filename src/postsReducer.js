export const postsReducer = (state, action) => {
  switch (action.type) {
    case "STORE_POSTS":
      return { ...state, posts: state.posts.concat(action.posts) };
    case "FETCHING_POSTS":
      return { ...state, fetching: action.fetching };
    default:
      return state;
  }
};

export const pageReducer = (state, action) => {
  switch (action.type) {
    case "ADVANCE_PAGE":
      return { ...state, page: state.page + 10 };
    default:
      return state;
  }
};
