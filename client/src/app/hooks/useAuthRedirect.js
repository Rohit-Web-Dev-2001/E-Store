import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useAuthRedirect = (requiredRole = null, redirectTo = "/") => {
  const { AuthData, checkTokken } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (AuthData?.jwtToken) {
      checkTokken();
    }

    if (requiredRole && AuthData?.role && AuthData.role !== requiredRole) {
      router.push(redirectTo);
    }
  }, [AuthData, requiredRole, redirectTo]);
};
