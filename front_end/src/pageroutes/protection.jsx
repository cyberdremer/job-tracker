import { AuthContext } from "@/context/authcontext";
import { Flex } from "@chakra-ui/react";
import LoadingPlaceholder from "@/fragments/loading";
import { useContext } from "react";
import { Navigate } from "react-router";

const RequireAuth = ({ children }) => {
  const { authed, loading, error } = useContext(AuthContext);

  if (loading) {
    return (
      <>
        <Flex grow="1"  justifyContent="center" alignItems="center">
          <LoadingPlaceholder />
        </Flex>
      </>
    );
  }

  if (error) {
    <Navigate to="/login"></Navigate>;
  }

  return authed ? children : <Navigate to="/login"></Navigate>;
};

export default RequireAuth;
