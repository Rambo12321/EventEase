import prisma from "./prismaClient";
export const validateUser = async (userId) => {
  const user = await prisma.User.findUnique({
    where: { id: parseInt(userId) },
  });

  return user ? true : false;
};
