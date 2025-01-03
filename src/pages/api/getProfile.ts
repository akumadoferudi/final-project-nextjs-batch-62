import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import Cookies from "js-cookie"; // Assuming token is stored in cookies

// interface dataStruct {
//   success: boolean;
//   data: any[] | any;
//   message: string;
// }

export default function GetProfile() {
    const token = Cookies.get("user_token"); // Get the token from cookies

    const { data, error, isLoading } = useSWR(
      token ? [`${process.env.NEXT_PUBLIC_API_URL}/user/me`, token] : null, // Conditional fetch
      ([url, token]) => fetcher(url, token)
    );

    // const dataFetch = data?.data;
  return { data, error, isLoading };
}
