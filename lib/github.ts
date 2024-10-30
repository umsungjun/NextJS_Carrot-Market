export const getAccessToken = async (code: string) => {
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

  return { error, access_token };
};

export const getUserProfile = async (access_token: string) => {
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    /* 기본적으로 GET request들은 Next.js의 cache에 의해서 저장 됨 */
    cache: "no-cache",
  });
  /* login = gitHub userName */
  const { id, avatar_url, login } = await userProfileResponse.json();

  return { id, avatar_url, login };
};
