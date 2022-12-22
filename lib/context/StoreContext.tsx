import React, { Dispatch, createContext, useContext, useReducer } from "react";
import actions from "./store-actions";

const initialState = {
  user: null
};

export interface Action {
  type: string;
  payload: any;
}

export interface Context {
  state: typeof initialState;
  dispatch: Dispatch<Action>;
}

export interface ProviderProps {
  children: React.ReactNode;
}

const StoreContext = createContext<Context>({
  state: initialState,
  dispatch: () => undefined
});

const reducer = (state: typeof initialState, action: Action): typeof initialState => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }: ProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): Context => useContext(StoreContext);