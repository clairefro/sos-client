import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionCost, setQuestionCost] = useState(0);
  const [responseCost, setResponseCost] = useState(0);

  return (
    <GlobalStateContext.Provider
      value={{
        question,
        setQuestion,
        answers,
        setAnswers,
        questionTitle,
        setQuestionTitle,
        questionCost,
        setQuestionCost,
        responseCost,
        setResponseCost,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
