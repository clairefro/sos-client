import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [generateThreadPrompt, setGenerateThreadPrompt] = useState("");
  const [generateReplyPrompt, setGenerateReplyPrompt] = useState("");

  return (
    <GlobalStateContext.Provider
      value={{
        questionTitle,
        setQuestionTitle,
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
