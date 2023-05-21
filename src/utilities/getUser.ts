import prisma from "../lib/PrismaClient";

export const getUser = async (androidId: string) => {
  return await prisma.user.findUnique({
    select: {
      userId: true,
      androidId: true,
      username: true,
    },
    where: {
      androidId,
    },
  });
};
