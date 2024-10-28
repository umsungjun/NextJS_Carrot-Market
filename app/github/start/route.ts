export function GET() {
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,user:email",
    allow_signup:
      "true" /* gitHub 계정이 없는 사람의 회원가입을 허용할것인지 여부 */,
  };
  /* URLSearchParams format */
  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `https://github.com/login/oauth/authorize?${formattedParams}`;
  return Response.redirect(finalUrl);
}
