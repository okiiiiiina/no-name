import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>ホーム</h1>
      <Link href="/member">メンバーページへ</Link>
    </>
  );
}
