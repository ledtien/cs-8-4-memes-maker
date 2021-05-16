import * as api from "../api";

export const getMemes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchMemes;
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};
