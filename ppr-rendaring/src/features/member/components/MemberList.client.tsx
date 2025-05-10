// =======================================
//  MemberList.client.tsx
//  Suspense + CSR で MemberTable を遅延読込
// =======================================
"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
// import type { ComponentType } from "react";

const MemberTable = dynamic(
  () => import("@/features/member/components/MemberTable.client"),
  {
    ssr: false,
    // @ts-expect-error suspense 型未対応
    suspense: true,
  },
);

export default function MemberList() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Member</h1>

      <Suspense fallback={<div>[client]Loading...</div>}>
        <MemberTable />
      </Suspense>
    </>
  );
}
