import { MainLayout } from "../../layouts/MainLayout";
import AIChatPage from "../../pages/ai-chat/AIChatPage";

export const ChatRoutes = [
  {
    path: "/",
    element: (
      <MainLayout>
        <AIChatPage />
      </MainLayout>
    )
  }
];
