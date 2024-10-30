import { PrismaClient, User } from "@prisma/client";

export const db = new PrismaClient();

/* github_id로 유저 탐색 함수 */
export const findUserByGithubId = async (github_id: string) => {
  const user = await db.user.findUnique({
    where: {
      github_id,
    },
    select: {
      id: true,
    },
  });

  return user;
};
