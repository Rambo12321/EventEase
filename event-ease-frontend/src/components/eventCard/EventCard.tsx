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
    <div className="eventCard">
      <div className="mb-1">{title}</div>
      <figure>
        <Image src={bannerImage} alt="Banner Image" width={200} height={200} />
      </figure>
      <div className="flex justify-around mt-1.5 bg-black text-white rounded-2xl">
        <div>{location}</div>
        <div> {`-> ${convertedDate}`}</div>
      </div>
      <div className="mt-1.5">
        <span
          className={`bg-green-700 rounded-md px-3 py-0.5 ${
            type === "Global" ? "bg-green-700" : "bg-red-700"
          }`}
        >
          Type: {type}
        </span>
      </div>
    </div>
  );
};

export default EventCard;
