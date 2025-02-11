import React, { createContext, useContext, useState, ReactNode } from "react";

interface HintContextType {
  showHintCounter: number;
  setShowHintCounter: (value: number) => void;
}

const HintContext = createContext<HintContextType | undefined>(undefined);

export const HintProvider = ({ children }: { children: ReactNode }) => {
  const [showHintCounter, setShowHintCounter] = useState(0);

  return (
    <HintContext.Provider value={{ showHintCounter, setShowHintCounter }}>
      {children}
    </HintContext.Provider>
  );
};

export const useHint = () => {
  const context = useContext(HintContext);
  if (!context) {
    throw new Error("useHint must be used within a HintProvider");
  }
  return context;
};
