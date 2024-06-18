import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_HELLO,
  dangerouslyAllowBrowser: true, // This is the default and can be omitted
});

export default openai;
