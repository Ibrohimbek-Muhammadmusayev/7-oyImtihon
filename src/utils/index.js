import axios from "axios";

export const productdata = axios.create({
  baseURL: "https://dummyjson.com",
});