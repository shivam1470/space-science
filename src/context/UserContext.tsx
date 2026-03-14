import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'engineer' | 'scientist' | 'explorer';
export type ProgressStep = 'intro' | 'role' | 'simulator' | 'game' | 'complete';

export interface UserState {
  name: string;
  weight: number;
  role: Role | null;
  progressStep: ProgressStep;
  score: number;
  completedItems: string[];
}

interface UserContextType {
  state: UserState;
  setName: (name: string) => void;
  setWeight: (weight: number) => void;
  setRole: (role: Role) => void;
  setProgressStep: (step: ProgressStep) => void;
  setScore: (score: number) => void;
  addCompletedItem: (item: string) => void;
  resetState: () => void;
}

const defaultState: UserState = {
  name: '',
  weight: 70,
  role: null,
  progressStep: 'intro',
  score: 0,
  completedItems: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserState>(defaultState);

  const setName = (name: string) => {
    setState(prev => ({ ...prev, name }));
  };

  const setWeight = (weight: number) => {
    setState(prev => ({ ...prev, weight }));
  };

  const setRole = (role: Role) => {
    setState(prev => ({ ...prev, role }));
  };

  const setProgressStep = (progressStep: ProgressStep) => {
    setState(prev => ({ ...prev, progressStep }));
  };

  const setScore = (score: number) => {
    setState(prev => ({ ...prev, score }));
  };

  const addCompletedItem = (item: string) => {
    setState(prev => ({
      ...prev,
      completedItems: [...prev.completedItems, item],
    }));
  };

  const resetState = () => {
    setState(defaultState);
  };

  const value: UserContextType = {
    state,
    setName,
    setWeight,
    setRole,
    setProgressStep,
    setScore,
    addCompletedItem,
    resetState,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
