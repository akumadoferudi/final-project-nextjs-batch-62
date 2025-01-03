import dynamic from "next/dynamic";
import GetNotifications from "@/pages/api/getNotifications";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notifications() {
  const {
    data: notificationsData,
    error: notificationsError,
    isLoading: notificationsLoading,
  } = GetNotifications();

  return (
    <LayoutComponent>
      <div>notif</div>
    </LayoutComponent>
  );
}
