const MESSAGE =
  "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

async function getAIResponse(inputPromopt: string): Promise<string> {
  // Response from AI will be based on inpuPrompt
  if (!inputPromopt) {
    throw new Error("Input Prompt in not given!");
  }
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(MESSAGE);
    }, 1000);
  });
}

export default getAIResponse;
