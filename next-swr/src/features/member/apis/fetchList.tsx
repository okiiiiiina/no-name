import { Member } from "@/features/member/types/index";

interface CustomError extends Error {
  code: number;
  status: string;
  message: string;
}

export default async function fetchList(id: string): Promise<Member[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${id}/members`,
  );

  if (!res.ok) {
    const errBody = (await res.json()) as {
      code: number;
      status: string;
      message: string;
    };

    // ❶ エラーボディを Error に載せ替えて throw
    const err = new Error(errBody.message) as CustomError;
    err.code = errBody.code;
    err.status = errBody.status;
    err.message = errBody.message;
    throw err; // ← UI 側は catch(err) で判定できる
  }

  const data = await res.json();

  // ♻️ デバック
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const members = data.map((d: any) => ({
    id: d.ID,
    name: d.Name,
  }));

  return members;
}

// import { GET as membersGet } from "@/app/api/[id]/members/route";
// import { Member } from "@/features/member/types/index";

// interface CustomError extends Error {
//   code: number;
//   status: string;
//   message: string;
// }

// export default async function fetchList(id: string): Promise<Member[]> {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const res = await membersGet(undefined as any, { params: { id } });

//   if (!res.ok) {
//     const errBody = (await res.json()) as {
//       code: number;
//       status: string;
//       message: string;
//     };

//     // ❶ エラーボディを Error に載せ替えて throw
//     const err = new Error(errBody.message) as CustomError;
//     err.code = errBody.code;
//     err.status = errBody.status;
//     err.message = errBody.message;
//     throw err; // ← UI 側は catch(err) で判定できる
//   }

//   const data = await res.json();

//   // ♻️ デバック
//   // await new Promise((resolve) => setTimeout(resolve, 3000));

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const members = data.map((d: any) => ({
//     id: d.ID,
//     name: d.Name,
//   }));

//   return members;
// }
