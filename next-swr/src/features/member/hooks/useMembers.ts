import useSWR from 'swr';
import { CustomError } from '@/libs/api/type'
import { Member} from "@/features/member/types"

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const errBody = await res.json();
    const err = new Error(errBody.message) as CustomError;
    err.code = errBody.code;
    err.status = errBody.status;
    throw err;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (await res.json()).map((d: any) => ({
    id: d.ID,
    name: d.Name,
  })) as Member[];
};

export default function useMembers(id: string) {
  const { data, error, isLoading } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/${id}/members` : null,
    fetcher
  );


  return {
    members: data,
    isLoading,
    error,
  };
}
