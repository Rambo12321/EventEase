import { eventCard } from "@/interfaces/eventInterface";
import BannerImg from "@/utils/bannerImgHandler";
import dateConverter from "@/utils/dateConverter";
import Image from "next/image";

const EventCard = ({ title, bannerImage, location, date, type }: eventCard) => {
  if (bannerImage === null || bannerImage === undefined) {
    bannerImage = BannerImg();
  }

  let convertedDate;

  if (date !== null) {
    convertedDate = dateConverter(date);
  }

  return (
    <div className="eventCard ">
      <div className="mb-1 glassEffect border-0! rounded-lg w-fit! px-1 mx-auto bg-blue-400/10!">
        {title}
      </div>
      <figure>
        <Image src={bannerImage} alt="Banner Image" width={200} height={200} />
      </figure>
      <div className="flex justify-between border-0! px-2 mt-1.5 text-stone-300 rounded-2xl glassEffect bg-blue-400/10!">
        <div>{location}</div>
        <figure className="self-center">
          <Image src="/rightArrow.svg" alt="Arrow" width={18} height={18} />
        </figure>
        <div className="-ml-0.5">{convertedDate}</div>
      </div>
      <div className="mt-1.5">
        <span
          className={`glassEffect rounded-md px-3 py-0.5 ${
            type === "Global" ? "bg-green-700/40!" : "bg-red-700/40!"
          }`}
        >
          Type: {type}
        </span>
      </div>
    </div>
  );
};

export default EventCard;
