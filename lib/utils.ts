/* 가격 정보를 원화로 변환하는 함수 */
export const formatToWon = (price: number): string => {
  return price.toLocaleString("ko-KR");
};

/* 현재 날짜에서 며칠전 날짜일지 반환하는 함수 */
export const formatToTimeAgo = (date: Date): string => {
  /* 하루를 초로 변환 */
  const datInMs = 1000 * 60 * 60 * 24;
  /* 1970년 1월 1일부터 date까지의 시간을 ms로 반환 */
  const time = new Date(date).getTime();
  /* 1970년 1월 1일부터 오늘까지의 시간을 ms로 반환 */
  const now = new Date().getTime();

  /* - 몇일 */
  const diff = Math.round((time - now) / datInMs);

  /* 음수는 "일 전"으로 표기, 양수는 "일 후"로 표기*/
  const formatter = new Intl.RelativeTimeFormat("ko");

  return formatter.format(diff, "days");
};
