// =======================================
//  MemberTable.server.tsx
//  Susoense CSR
// =======================================
"use client";

import useMembers from "@/features/member/hooks/useMembers"
import { Member } from "@/features/member/types"

export default function MemberTable() {
  console.log("🍊 MemberTable.client");
  const wsID = process.env.NEXT_PUBLIC_WORKSPACE_ID;
  const { members, isLoading, error} = useMembers(wsID!)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (<>
      <div>{error.code}</div>
      <div>{error.status}</div>
    </>)
  }

  return (
    <table className="min-w-full border border-gray-300 text-left text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 border-b font-medium text-gray-700">ID</th>
          <th className="px-4 py-2 border-b font-medium text-gray-700">名前</th>
        </tr>
      </thead>

      <tbody>
        {members?.map((r: Member) => (
          <tr key={r.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{r.id}</td>
            <td className="px-4 py-2 border-b">{r.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
