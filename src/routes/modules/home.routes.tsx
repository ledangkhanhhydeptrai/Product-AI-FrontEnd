import MainLayout from "../../layouts/MainLayout";
import HomePage from "../../pages/home/home";

const homeRoutes = [
  {
    path: "/",
    element: (
      <MainLayout>
        <HomePage cartCount={0} onSearchSubmit={() => {}} />
      </MainLayout>
    )
  }
];

export default homeRoutes;
