import { BLOG_POSTS } from "../data/constants";

export const initialBlogState = { posts: BLOG_POSTS, nextId: 6 };

export function blogReducer(state, action) {
  switch (action.type) {
    case "ADD": return { ...state, posts: [{ ...action.payload, id: state.nextId }, ...state.posts], nextId: state.nextId + 1 };
    case "DELETE": return { ...state, posts: state.posts.filter(p => p.id !== action.id) };
    default: return state;
  }
}
