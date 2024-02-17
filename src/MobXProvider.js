"use client";
import React, { createContext, useContext } from "react";
import appStore from "./mobxStore";

const MobXContext = createContext();

const MobXProvider = ({ children }) => {
  return (
    <MobXContext.Provider value={appStore}>{children}</MobXContext.Provider>
  );
};

const useMobXStore = () => {
  const context = useContext(MobXContext);
  if (!context) {
    throw new Error("useMobXStore must be used within a MobXProvider");
  }
  return context;
};

export { MobXProvider, useMobXStore };
