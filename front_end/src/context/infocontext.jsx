import { createContext, useState } from "react";

const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (user) => {
    setUser({
      ...user,
      fullname: user.fullname,
      email: user.email,
    });
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <InfoContext.Provider value={{updateUser, clearUser, user}}>
      {children}
    </InfoContext.Provider>
  );
};

export { InfoContext, InfoProvider };
