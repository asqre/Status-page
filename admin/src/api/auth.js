import axios from "./axios";

export const logout = async () => {
  try {
    const res = await axios.post("/auth/logout");
    return res.data;
  } catch (error) {
    throw error;
  }
};
