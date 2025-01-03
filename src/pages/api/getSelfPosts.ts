import useSWR from "swr";
// import { useSWRConfig } from "swr";
import Cookies from "js-cookie"; // Assuming token is stored in cookies
import fetcher from "@/utils/fetcher";

// interface dataStruct {
//   success: boolean;
//   data: any[] | any;
//   message: string;
// }

export default function GetSelfPosts() {
  // const { mutate } = useSWRConfig();
  const token = Cookies.get("user_token"); // Get the token from cookies

  const { data, error, isLoading } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL}/posts?type=me`, token] : null, // Conditional fetch
    ([url, token]) => fetcher(url, token)
  );

  // const mutatePosts = mutate(
  //   [`${process.env.NEXT_PUBLIC_API_URL}/posts?type=all`, token], // Key for SWR
  //   null, // No data for optimistic update
  //   true // Revalidate from the server
  // );

    // const dataFetch = data?.data;
  return { data, error, isLoading };
}
