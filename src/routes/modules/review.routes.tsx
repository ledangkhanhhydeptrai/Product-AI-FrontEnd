import { MainLayout } from "../../layouts/MainLayout";
import ReviewPage from "../../pages/review/ReviewPage";

const ReviewRoutes = [
  {
    path: "/review",
    element: (
      <MainLayout>
        <ReviewPage />
      </MainLayout>
    )
  }
];
export default ReviewRoutes;
