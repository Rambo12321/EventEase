import prisma from "./prismaClient";

export const verifyUser = async (id, userId, role) => {
  const foundEvent = await prisma.event.findUnique({
    where: { id: parseInt(id) },
  });

  if (!foundEvent) {
    const err = new Error(`No event found with ${id}`);
    err.statusCode = 404;
    throw err;
  }

  if (foundEvent.userId === userId || role === "ADMIN") {
    return true;
  }
  const err = new Error(`Unautharized Access`);
  err.statusCode = 403;
  throw err;
};
