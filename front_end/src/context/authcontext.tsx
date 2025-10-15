import { protectedGetRequest, protectedPostRequest } from "@/utils/requests";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { InfoContext } from "./infocontext";


type AuthContextType = {
  authed: boolean;
  loading: boolean;
  error: boolean;
  setAuthed: Dispatch<SetStateAction<boolean>>
  destroySession: () => void
}


interface AuthContextProps  {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider = ({ children }: AuthContextProps) => {
  const { updateUser, clearUser } = useContext(InfoContext);
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await protectedGetRequest("/auth/verify");
        if (response.error) {
          throw new Error(response.error.message);
        }
        const { fullname, email } = response.data.user;
        updateUser({ fullname, email });
        setAuthed(true);
      } catch (error) {
        setAuthed(false);
        clearUser();
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const destroySession = async () => {
    try {
      const response = await protectedPostRequest("/logout", {});
      if (response.error) {
        throw new Error(response.error.message);
      }
      setAuthed(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ authed, loading, error, destroySession, setAuthed }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
