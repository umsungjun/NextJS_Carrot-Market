import { NextRequest, NextResponse } from "next/server";

/* 
  middleware Trigger
  페이지를 바꿀 떄
  브라우저가 css, javascript, favicon 파일을 다운 받을 때
*/

export const middleware = async (request: NextRequest) => {
  console.log("hello test");
};

export const config = {
  /* middleware를 실행시킬 페이지 
    "/" 꼭 붙여야 함
    /user/:path* <- user path로 시작하는 곳에 전부 적용
    matcher: ["/", "/profile", "/create-account", "/user/:path*"]
  */

  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
