import React, { useReducer } from "react";

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    // react will automatically send the dispatch function to reducer.
    const [state, dispatch] = useReducer(reducer, defaultValue);

    // functions that we use to somehow change the state
    const boundActions = {};
    // actions === object
    for (let key in actions) {
      // look up each key(action functions) and call/apply the dispatch function.
      boundActions[key] = actions[key](dispatch);
    }

    return (
      // context provider react component makes data available to all
      // different component rendered under it
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  // context is the context object we will use to get ACCESS to information from child components.
  // provider will make data AVAILABLE to everything else inside application.
  return { Context, Provider };
};
