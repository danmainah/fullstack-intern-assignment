import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import  jwt from "jsonwebtoken";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      try {
        const userData = jwt.verify(token, "my-secret");
        dispatch(setUser(userData as { username: string }));
      } catch (error) {
        dispatch(clearAuth());
      }
    }
    }, [token, dispatch]);
  return user;
};

export default useAuthSession;
