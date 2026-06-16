import MainLayout from "../../layouts/MainLayout";
import ProfilePage from "../../pages/profile/ProfilePage";

export const profileRoutes = [
  {
    path: "/profile",
    element: (
      <MainLayout>
        <ProfilePage />
      </MainLayout>
    )
  }
];
