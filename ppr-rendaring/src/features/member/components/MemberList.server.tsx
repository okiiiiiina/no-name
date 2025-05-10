// =======================================
//  MemberList.server.tsx
//  MemberTable.server
// =======================================
import MemberTable from "@/features/member/components/MemberTable.server";
import { Suspense } from "react";

export const experimental_ppr = true;

export default async function MemberList() {
  console.log("🍊 MemberList");
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Member</h1>

      <Suspense
        fallback={<div>[MemberList/MemberTable.server]Loading...</div>}
        name="MemberTable"
      >
        <MemberTable />
      </Suspense>
    </>
  );
}
