import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [generateThreadPrompt, setGenerateThreadPrompt] = useState("");
  const [generateReplyPrompt, setGenerateReplyPrompt] = useState("");
  const [locationKey, setLocationKey] = useState("");

  const location = useLocation();

  const [currentLocationPathname, setCurrentLocationPathname] = useState(
    location.pathname
  );
  const [previousLocationPathname, setPreviousLocationPathname] = useState(
    location.pathname
  );

  useEffect(() => {
    setCurrentLocationPathname(location.pathname);
    setPreviousLocationPathname(currentLocationPathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <GlobalStateContext.Provider
      value={{
        questionTitle,
        setQuestionTitle,
        generateThreadPrompt,
        setGenerateThreadPrompt,
        generateReplyPrompt,
        setGenerateReplyPrompt,
        locationKey,
        setLocationKey,
        currentLocationPathname,
        previousLocationPathname,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
