import { useContext, createContext } from "react";
import useUserSettings, { UserHookType } from "./useUserSettings";

interface GlobalContextType {
  userHook: UserHookType;
}

// @ts-ignore
const GlobalContext = createContext<GlobalContextType>(null);

export const GlobalContextProvider = ({ children }: any) => {
  // State
  const userHook = useUserSettings();

  return (
    // @ts-ignore2
    <GlobalContext.Provider value={{ userHook }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
