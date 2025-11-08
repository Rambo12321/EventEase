"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { setCredentials } from "@/store/authSlice";
import Navbar from "../navbar/Navbar";

const PUBLIC_PATHS = ["/login", "/", "/signup", "/events/global"];
const NAVBAR_PAGES = ["/dashboard", "/events", "/events/global", "/events/add"];

const ContextLogic = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (PUBLIC_PATHS.includes(pathName)) return;
    const fetchCreds = async () => {
      const token = await getCookie("token");
      const userCookie = (await getCookie("user")) || "";

      console.log("TokenCookie -> ", token);
      console.log("UserCookie -> ", userCookie);

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
  const pathName = usePathname();

  const navBarTrue = NAVBAR_PAGES.includes(pathName);
  return (
    <Provider store={store}>
      <ContextLogic>
        {navBarTrue && <Navbar />}
        {children}
      </ContextLogic>
    </Provider>
  );
};

export default ContextProvider;
