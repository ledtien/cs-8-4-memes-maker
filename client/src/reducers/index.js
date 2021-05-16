import { combineReducers } from "redux";
import memesPosts from "./memesPosts";

export default combineReducers({
  memes: memesPosts,
});
