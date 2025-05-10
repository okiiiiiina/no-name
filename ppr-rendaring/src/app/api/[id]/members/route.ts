import { NextRequest, NextResponse } from "next/server";

// const baseUrl = process.env.BFF_BASE_URL;
const baseUrl = process.env.NEXT_PUBLIC_BFF_BASE_URL;

/**
 * SSG
 * @param _req
 * @param context
 * @returns
 */
// export async function GET(
//   _req: NextRequest,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   context: any,
// ) {
//   const { id } = context.params as { id: string };
//   console.log(`🍎${baseUrl}/workspaces/${id}/members`);

//   const res = await fetch(`${baseUrl}/workspaces/${id}/members`, {
//     cache: 'force-cache'
//   });
//   if (!res.ok) {
//     const errorBody = await res.json();
//     return NextResponse.json(errorBody, { status: res.status });
//   }
//   const members = await res.json();
//   console.log("🍏 members", members);
//   return NextResponse.json(members, { status: 200 });
// }

/**
 * ISR
 * @param _req
 * @param context
 * @returns
 */
// export async function GET(
//   _req: NextRequest,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   context: any,
// ) {
//   const { id } = context.params as { id: string };
//   console.log(`🍎${baseUrl}/workspaces/${id}/members`);

//   const res = await fetch(`${baseUrl}/workspaces/${id}/members`, {
//     next: { revalidate: 30 },
//   });
//   if (!res.ok) {
//     const errorBody = await res.json();
//     return NextResponse.json(errorBody, { status: res.status });
//   }
//   const members = await res.json();
//   console.log("🍏 members", members);
//   return NextResponse.json(members, { status: 200 });
// }

/**
 * SSR
 * @param _req
 * @param context
 * @returns
 */
export async function GET(
  _req: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any,
) {
  const { id } = context.params as { id: string };
  console.log(`🍎URL：${baseUrl}/workspaces/${id}/members`);

  const res = await fetch(`${baseUrl}/workspaces/${id}/members`, {
    cache: "no-store",
  });
  if (!res.ok) {
    const errorBody = await res.json();
    return NextResponse.json(errorBody, { status: res.status });
  }

  // ♻️ デバック
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const members = await res.json();
  console.log("🍏 members", members);
  return NextResponse.json(members, { status: 200 });
}
