import { createContext, ReactNode, useState } from "react";

type UserInformation = {
  fullname: string;
  email: string;
};

type InfoContextType = {
  user: UserInformation | null;
  updateUser: (user: UserInformation) => void;
  clearUser: () => void;
};

interface InforProviderProps {
  children: ReactNode;
}
const InfoContext = createContext<InfoContextType | undefined>(undefined);

const InfoProvider = ({ children }: InforProviderProps) => {
  const [user, setUser] = useState<UserInformation | null>(null);

  const updateUser = (user: UserInformation) => {
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
    <InfoContext.Provider value={{ updateUser, clearUser, user }}>
      {children}
    </InfoContext.Provider>
  );
};

export { InfoContext, InfoProvider };
