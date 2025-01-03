import dynamic from "next/dynamic";
import GetProfile from "@/pages/api/getProfile";
import GetSelfPosts from "@/pages/api/getSelfPosts";
import SelfProfile from "@/components/selfProfile";
import ListOfPosts from "@/components/listOfPosts";
import { useEffect } from "react";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Profile() {
  const {
    data: profileData,
    error: profileError,
    isLoading: profileLoading,
  } = GetProfile();

  const {
    data: postsData,
    error: postsError,
    isLoading: postsLoading,
  } = GetSelfPosts();

  if (profileLoading || !profileData) {
    return <div>Loading...</div>;
  }

  if (postsLoading || !postsData) {
    return <div>Loading...</div>;
  }

  return (
    <LayoutComponent>
      {/* <div>{JSON.stringify(profileData)}</div> */}
      <SelfProfile profileData={profileData} />
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
