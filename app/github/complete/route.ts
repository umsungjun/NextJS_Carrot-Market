import { db } from "@/lib/db";
import { getSession, saveSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  /* accessToken 받는 로직 */
  const accessTokenParam = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParam}`;

  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: " application/json",
    },
  });
  const { error, access_token } = await accessTokenResponse.json();

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    /* 기본적으로 GET request들은 Next.js의 cache에 의해서 저장 됨 */
    cache: "no-cache",
  });
  /* login = gitHub userName */
  const { id, avatar_url, login } = await userProfileResponse.json();

  /* 사용자 존재 여부 */
  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });

  if (user) {
    await saveSession(user.id);
  }

  const newUser = await db.user.create({
    data: {
      github_id: id + "",
      avatar: avatar_url,
      /* ToDo GitHub계정의 닉네임이 중복 된 닉네임일 수 있음 */
      username: login,
    },
    select: {
      id: true,
    },
  });

  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect("/profile");
}
