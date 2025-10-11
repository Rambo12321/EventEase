"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { setCredentials } from "@/store/authSlice";

const PUBLIC_PATHS = ["/login", "/", "/signup", "/dashboard"];

const ContextLogic = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const pathName = usePathname();

  useEffect(() => {
    if (PUBLIC_PATHS.includes(pathName)) return;

    const fetchCreds = async () => {
      const token = await getCookie("token");
      const userCookie = (await getCookie("user")) || "";

      const user = userCookie ? JSON.parse(userCookie) : null;

      if (!token || typeof token !== "string") {
        console.log("Redirecting from CotextProvider security check");
        router.push("/login");
        return;
      }

      try {
        if (typeof token === "string" && user && typeof user === "object") {
          dispatch(setCredentials({ token: token, user: user }));
        }
        return;
      } catch (error) {
        console.error(`Invalid Token`, error);
        router.push("/login");
      }
    };
    fetchCreds();
  }, [router, dispatch, pathName]);

  return <>{children}</>;
};

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ContextLogic>{children}</ContextLogic>
    </Provider>
  );
};

export default ContextProvider;
