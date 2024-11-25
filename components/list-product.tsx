import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProductsProps {
  id: number;
  title: string;
  price: number;
  photo: string;
  description: string;
  created_at: Date;
}

export default function ListProduct({
  id,
  title,
  price,
  photo,
  description,
  created_at,
}: ListProductsProps) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="relative min-w-28 min-h-28 rounded-md overflow-hidden">
        {/* width와 height를 모르는 경우에 fill 속성을 사용 함 */}
        <Image src={photo} alt={title} fill quality={100} />
      </div>
      <div className="flex flex-col gap-1 text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at)}
        </span>
        <span className="text-lg font-semibold">{formatToWon(price)}원</span>
      </div>
    </Link>
  );
}
