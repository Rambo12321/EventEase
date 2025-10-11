import { navItems } from "@/constants/navItems";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { selectAuthToken, logout } from "@/store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { deleteCookie } from "cookies-next";

const Navbar = () => {
  const token = useSelector(selectAuthToken);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());

    deleteCookie("user");
    deleteCookie("token");

    router.push("/login");
  };

  return (
    <>
      <div className="navbarBg">
        <div className="mr-auto">
          <ul className="flex justify-between">
            <li>
              <Link href={token ? "/dashboard" : "/signup"}>
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
            className="m-auto mt-0 mb-0 p-2 cursor-pointer hover:bg-blue-300/20! rounded-2xl text-cyan-100 font-bold navbarItems hover:scale-75"
            onClick={handleClick}
          >
            Logout!
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
