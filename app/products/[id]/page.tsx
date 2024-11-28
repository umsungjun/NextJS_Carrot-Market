const getProduct = async () => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
};

export default async function ProductDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProduct();
  return <span>상품 상세</span>;
}
