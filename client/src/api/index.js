import axios from "axios";

const url = "http://localhost:5000/api/memes";

export const fetchMemes = () => axios.get(url);
