import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const EventTypeSwitchButton = () => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const currPath = usePathname();
  console.debug("Current path for button -> ", currPath);

  let globalTrue,
    userTrue = false;

  if (currPath.match("/events/global")) {
    globalTrue = true;
  } else if (currPath.match("/events")) {
    userTrue = true;
  }

  const toggle = () => {
    if (sidebar) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  };

  return (
    <div className="flex">
      <button
        onClick={toggle}
        className={`glassEffect w-fit border-l-0! mt-4 hover:cursor-grab bg-black/25! ${
          sidebar ? "hidden" : ""
        }`}
      >
        <Image src="/arrow_forward.svg" alt="➡️" width={50} height={50} />
      </button>
      <div
        className={`text-2xl bg-blue-400/25! mt-4 font-newsReader font-bold glassEffect w-fit px-2 ${
          !sidebar ? "hidden" : ""
        }`}
      >
        <span className="mr-1.5 text-gray-900">
          Switch between User/Global events :
        </span>
        <Link href="/events/global">
          <button
            disabled={globalTrue}
            className={`pageSwitchButton ${globalTrue ? " bg-white/20!" : ""}`}
          >
            Global
          </button>
        </Link>
        <span className="border-r-2 border-white text-[37px]">{`   `}</span>
        <Link href="/events">
          <button
            disabled={userTrue}
            className={`pageSwitchButton ml-2 ${
              userTrue ? "bg-white/20! scale-95" : ""
            }`}
          >
            User
          </button>
        </Link>
      </div>
      <button
        onClick={toggle}
        className={`glassEffect w-fit border-l-0! mt-4 bg-black/25! glassEffect hover:cursor-grab ${
          !sidebar ? "hidden" : ""
        }`}
      >
        <Image
          className=""
          src="/arrow_back.svg"
          alt="⬅️"
          width={40}
          height={40}
        />
      </button>
    </div>
  );
};

export default EventTypeSwitchButton;
