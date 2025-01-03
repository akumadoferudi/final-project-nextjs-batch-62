import dynamic from "next/dynamic";
import GetPosts from "@/pages/api/getPosts";
import ListOfPosts from "@/components/listOfPosts";
import { useEffect } from "react";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Home() {
  const {
    data: postsData,
    error: postsError,
    isLoading: postsLoading,
  } = GetPosts();

  // useEffect(() => {
  //   console.log(postsData);
  // }, [postsData, postsError, postsLoading]);

  return (
    <LayoutComponent>
      <div className="text-white">
        <ListOfPosts
          postsData={postsData}
          postsError={postsError}
          postsLoading={postsLoading}
        />
      </div>
    </LayoutComponent>
  );
}
