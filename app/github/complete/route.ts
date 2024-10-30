import { db, findUserByGithubId } from "@/lib/db";
import { getAccessToken, getUserProfile } from "@/lib/github";
import { saveSession } from "@/lib/session";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  /* 1. access_token 받아오기 */
  const { error, access_token } = await getAccessToken(code);

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  /* 2. github 유저 정보 받아오기 */
  const { id, avatar_url, login } = await getUserProfile(access_token);

  /* 3. github_id로 유저 존재 여부 확인 */
  const user = await findUserByGithubId(String(id));

  /* 기존 회원일 때 세션에 유저 아이디 저장 후 profile 페이지로 redirect */
  if (user) {
    await saveSession(user.id);
  } else {
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
    await saveSession(newUser.id);
  }
}
