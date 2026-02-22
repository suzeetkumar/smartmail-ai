import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/email";

export const generateEmail = async (emailContent, tone) => {
  const response = await axios.post(`${API_BASE_URL}/generate`, {
    emailContent,
    tone,
  });

  return response.data.generateReply;
};