"use client";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/authSlice";
import Navbar from "@/components/navbar/Navbar";

const DashBoardPage = () => {
  const user = useSelector(selectCurrentUser) || { name: "Rohan Kaushik" };
  return (
    <>
      <Navbar />
      <div className="w-full m-auto text-center">
        <div className="text-8xl text-amber-700 pt-16 ">
          Hello {user?.name.split(" ")[0]},
        </div>
        <div>All tasks</div>
        <footer>Contact me and Email and other site links</footer>
      </div>
    </>
  );
};

export default DashBoardPage;
