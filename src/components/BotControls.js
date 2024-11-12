// BotContext.js
import React, { createContext, useState } from 'react';

export const BotContext = createContext();

export const BotProvider = ({ children }) => {
  const [botActive, setBotActive] = useState(false);
  
  return (
    <BotContext.Provider value={{ botActive, setBotActive }}>
      {children}
    </BotContext.Provider>
  );
};
