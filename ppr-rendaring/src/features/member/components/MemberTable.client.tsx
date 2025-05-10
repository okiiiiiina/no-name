// =======================================
//  MemberTable.server.tsx
//  Susoense CSR
// =======================================
"use client";

import { useEffect, useState } from "react";
import fetchList from "@/features/member/apis/fetchList";
import { Member } from "@/features/member/types";

export default function MemberTable() {
  console.log("🍊 MemberTable.client");
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const load = async () => {
      const wsID = process.env.NEXT_PUBLIC_WORKSPACE_ID!;
      const res = await fetchList(wsID);
      if (res !== undefined) {
        setMembers(res);
      }
    };
    load();
  }, []);

  return (
    <table className="min-w-full border border-gray-300 text-left text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 border-b font-medium text-gray-700">ID</th>
          <th className="px-4 py-2 border-b font-medium text-gray-700">名前</th>
        </tr>
      </thead>

      <tbody>
        {members!.map((r) => (
          <tr key={r.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{r.id}</td>
            <td className="px-4 py-2 border-b">{r.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// =====================================================
//  ダメだった。一生「MemberTable」レンダリングされ続ける
//  MemberTable.server.tsx
//  MemberTable.client
// =====================================================

// "use client";

// import { cache, use } from "react";
// import fetchList from "@/features/member/apis/fetchList";

// const getMembers = cache((wsID: string) => fetchList(wsID));

// export default function MemberTable() {
//   console.log("🍊 MemberTable.client");

//   const wsID = process.env.NEXT_PUBLIC_WORKSPACE_ID!;
//   const members = use(getMembers(wsID)); // ★ これで 1 回だけ fetch

//   return (
//     <table className="min-w-full border border-gray-300 text-left text-sm">
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="px-4 py-2 border-b font-medium text-gray-700">ID</th>
//           <th className="px-4 py-2 border-b font-medium text-gray-700">名前</th>
//         </tr>
//       </thead>

//       <tbody>
//         {members.map((r) => (
//           <tr key={r.id} className="hover:bg-gray-50">
//             <td className="px-4 py-2 border-b">{r.id}</td>
//             <td className="px-4 py-2 border-b">{r.name}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
