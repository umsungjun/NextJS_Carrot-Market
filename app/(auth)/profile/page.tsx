import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

const getUser = async () => {
  const session = await getSession();

  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  /* 404 Page */
  notFound();
};

export default async function Profile() {
  const user = await getUser();

  const logOut = async () => {
    "use server";
    const session = await getSession();
    /* 유저 정보가 담긴 쿠키 삭제 */
    await session.destroy();
    redirect("/");
  };

  return (
    <div>
      <h1>Welcome! {user?.username}</h1>
      <form action={logOut}>
        <button>로그 아웃 테스트</button>
      </form>
    </div>
  );
}
