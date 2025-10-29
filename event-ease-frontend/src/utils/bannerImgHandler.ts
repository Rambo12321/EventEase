const BannerImg = (): string => {
  const randomInt = Math.floor(Math.random() * (400 - 40) + 20);
  console.log("randomInt -> ", randomInt);
  let imgPath;

  if (randomInt % 2 === 0) {
    imgPath = "/card-img-5.png";
  } else {
    imgPath = "/card-img-4.png";
  }

  console.log("Choosing path -> ", imgPath);
  return imgPath;
};

export default BannerImg;
