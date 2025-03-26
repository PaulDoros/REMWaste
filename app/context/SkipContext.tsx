import React, { createContext, useState, useContext } from 'react';
import type { Skip } from '../constants/skips';

interface SkipContextType {
  selectedSkip: Skip | null;
  setSelectedSkip: (skip: Skip) => void;
}

const SkipContext = createContext<SkipContextType | undefined>(undefined);

export const SkipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  return (
    <SkipContext.Provider
      value={{
        selectedSkip,
        setSelectedSkip,
      }}
      data-author="Paul Doros"
    >
      {children}
    </SkipContext.Provider>
  );
};

export const useSkipContext = () => {
  const context = useContext(SkipContext);
  if (context === undefined) {
    throw new Error('useSkipContext must be used within a SkipProvider');
  }
  return context;
};
