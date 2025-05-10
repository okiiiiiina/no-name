"use client";

import { useState } from "react";

export default function UserMenu() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="hover:underline"
      >
        ユーザー名
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded-md z-10">
          <ul className="text-sm">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              プロフィール
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">設定</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              ログアウト
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
