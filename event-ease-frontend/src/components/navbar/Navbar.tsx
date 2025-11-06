import { navItems } from "@/constants/navItems";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { logout } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { deleteCookie } from "cookies-next";

const Navbar = () => {
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
      <div className="navbarBg border-b-amber-50/20 border-b-2">
        <div className="mr-auto">
          <ul className="flex justify-between">
            <li>
              <Link className="cursor-customPointer" href="/dashboard">
                <Image
                  src="/Event-Ease.png"
                  alt="Event-Ease Logo"
                  width={60}
                  height={60}
                  className="rounded-md"
                />
              </Link>
            </li>
            {navItems.map(({ id, name, target }) => (
              <li
                key={id}
                className="w-40 font-semibold navbarItems cursor-customPointer text-center pt-3.5"
              >
                <Link className="cursor-customPointer" href={target}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-[150px] flex border-l-2 border-l-white/5">
          <button
            className="m-auto cursor-customPointer mt-0 mb-0 hover:bg-red-600/10! rounded-2xl text-yellow-300 font-extrabold navbarItems hover:scale-85"
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
