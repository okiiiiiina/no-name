// =======================================
//  MemberTable.server.tsx
//  Susoense SSR
// =======================================
import fetchList from "@/features/member/apis/fetchList";

export default async function MemberTable() {
  console.log("🍊 MemberTable.server");
  const wsID = process.env.NEXT_PUBLIC_WORKSPACE_ID;
  const res = await fetchList(wsID!);

  return (
    <>
      <table className="min-w-full border border-gray-300 text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b font-medium text-gray-700">ID</th>
            <th className="px-4 py-2 border-b font-medium text-gray-700">
              名前
            </th>
          </tr>
        </thead>
        <tbody>
          {res.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{r.id}</td>
              <td className="px-4 py-2 border-b">{r.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
