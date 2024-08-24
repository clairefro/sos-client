import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [question, setQuestion] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionCost, setQuestionCost] = useState(0);
  const [responseCost, setResponseCost] = useState(0);
  const [generateThreadPrompt, setGenerateThreadPrompt] = useState("");
  const [generateReplyPrompt, setGenerateReplyPrompt] = useState("");

  return (
    <GlobalStateContext.Provider
      value={{
        question,
        setQuestion,
        questionTitle,
        setQuestionTitle,
        questionCost,
        setQuestionCost,
        responseCost,
        setResponseCost,
        generateThreadPrompt,
        setGenerateThreadPrompt,
        generateReplyPrompt,
        setGenerateReplyPrompt,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
