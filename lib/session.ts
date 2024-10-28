import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SessionContent {
  id?: number;
}

export const getSession = async () => {
  return await getIronSession<SessionContent>(cookies(), {
    cookieName: "delicious-carrot",
    password: process.env.COOKIE_PASSWORD!,
  });
};

export const saveSession = async (userId: number) => {
  const session = await getSession();
  session.id = userId;
  await session.save();

  redirect("/profile");
};
