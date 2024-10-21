import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

/* 로그인 하지 않았을 경우 접속 가능 페이지 */
const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
  "/github/start": true,
  "/github/complete": true,
};

/* 
  middleware Trigger
  페이지를 바꿀 떄
  브라우저가 css, javascript, favicon 파일을 다운 받을 때

  node.js runtime에 실행되지 않음, Edge runtime이라는 곳에서 실행 됨
*/
export const middleware = async (request: NextRequest) => {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  if (!session.id) {
    if (!exists) {
      /* 로그인하지 않고 publicOnlyUrls 페이지 접속 시 이전 페이지로 redirect */
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
};

export const config = {
  /* middleware를 실행시킬 페이지 
    "/" 꼭 붙여야 함
    /user/:path* <- user path로 시작하는 곳에 전부 적용
    matcher: ["/", "/profile", "/create-account", "/user/:path*"]
  */

  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
