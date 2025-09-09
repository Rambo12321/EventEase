"use client";

import { navItems } from "@/constants/navItems";
import { deleteCookie, getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Navbar = () => {
  useEffect(() => {
    const token = getCookie("token");

    if (!token || typeof token != "string") {
      router.push("/login");
      return;
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return;
    } catch (error) {
      console.log("Error found -> ", error);
    }
  });
  const router = useRouter();
  const handleClick = () => {
    deleteCookie("token");
    router.push("/login");
  };

  return (
    <div className="navbarBg">
      <div className=" mr-auto">
        <ul className="flex justify-between">
          <li>
            <Link href={getCookie("token") ? "/dashboard" : "/signup"}>
              <Image
                src="/Event-Ease.png"
                alt="Event-Ease Logo"
                width={80}
                height={80}
                className="rounded-2xl"
              />
            </Link>
          </li>
          {navItems.map(({ id, name, target }) => (
            <li
              key={id}
              className="p-5 mt-auto mb-auto font-semibold border-r border-black navbarItems"
            >
              <Link href={target}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-1 w-[150px] flex">
        <button
          className="m-auto p-2 cursor-pointer text-green-600 font-bold navbarItems"
          onClick={handleClick}
        >
          Logout!
        </button>
      </div>
    </div>
  );
};

export default Navbar;
