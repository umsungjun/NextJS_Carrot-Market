/* 가격 정보를 원화로 변환하는 함수 */
export const formatToWon = (price: number) => {
  return price.toLocaleString("ko-KR");
};
