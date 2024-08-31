import axios from "axios";

export const gptFetchInfo = async (prompt) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_CHATGPT_API_URL,
      {
        model: import.meta.env.VITE_CHATGPT_API_MODEL,
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_CHATGPT_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching data from ChatGPT: ", error);
    throw error;
  }
};
