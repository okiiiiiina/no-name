import UserMenu from "@/features/components/UserMenu.client";

export default function Header() {
  return (
    <nav className="bg-black h-[40px] flex items-center px-4 justify-between text-white relative">
      <div className="text-lg font-bold">タイトル</div>
      <UserMenu />
    </nav>
  );
}
