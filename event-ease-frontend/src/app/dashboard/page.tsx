import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

const DashBoardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Navbar />
    </>
  );
};

export default DashBoardPage;
