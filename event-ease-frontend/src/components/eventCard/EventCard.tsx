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
      <div className="flex justify-around mt-1.5">
        <div>{location}</div>
        <div>{convertedDate}</div>
      </div>
      <div className="mt-1.5">Type: {type}</div>
    </div>
  );
};

export default EventCard;
