import prisma from "./prismaClient.js";
export const validateUser = async (userId) => {
  const user = await prisma.User.findUnique({
    where: { id: parseInt(userId) },
  });

  return user ? true : false;
};
