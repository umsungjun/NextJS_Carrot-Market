/* password */
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 20;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_MIN_ERROR = "비밀번호는 최소 8자 이상이어야 합니다.";
export const PASSWORD_MAX_ERROR = "비밀번호는 최대 20자까지 입력 가능합니다.";
export const PASSWORD_REGEX_ERROR =
  "비밀번호는 문자, 숫자, 특수문자를 포함해야 합니다.";

/* name */
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 20;
export const NAME_REGEX = ["썅", "씨발", "시발", "개새끼", "병신"];
