import { navItems } from "@/constants/navItems";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { selectCurrentUser, selectAuthToken, logout } from "@/store/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectAuthToken);
  const router = useRouter();
  const dispatch = useDispatch();

  if (!token) {
    router.push("/login");
  }

  const handleClick = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <>
      <div className="navbarBg">
        <div className=" mr-auto">
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
            className="m-auto p-2 cursor-pointer text-green-600 font-bold navbarItems"
            onClick={handleClick}
          >
            Logout!
          </button>
        </div>
      </div>
      <div className="text-3xl text-amber-700">Hello ${user?.name}</div>
    </>
  );
};

export default Navbar;
