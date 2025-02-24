import React, {
  createContext,
  useContext,
  useReducer,
  PropsWithChildren,
} from "react";

const BreadcrumbsContext = createContext<any>(null);

// Initial State
const initialState = {
  breadcrumbs: [],
};

// Reducer Function
function reducer(state: any, action: any) {
  switch (action.type) {
    case "SET_BREAD":
      return {
        ...state,
        breadcrumbs: action.payload,
      };
    default:
      return state;
  }
}

// Provider Component
const AdminNavLayoutProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BreadcrumbsContext.Provider value={{ state, dispatch }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

// Custom Hook
const useAdminNavContext = () => {
  const context = useContext(BreadcrumbsContext);
  if (!context) {
    throw new Error(
      "useBreadcrumbs must be used within an AdminNavLayoutProvider"
    );
  }
  return context;
};

export { AdminNavLayoutProvider, useAdminNavContext };
