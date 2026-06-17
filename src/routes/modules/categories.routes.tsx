import CategoryContainerAll from "../../features/categories/categoryContainer/categoryContainerAll";
import CategoryDetailContainer from "../../features/categories/categoryDetail/CategoryDetailContainer";
import { MainLayout } from "../../layouts/MainLayout";


const CategoriesRoutes = [
  {
    path: "/categoriesAll",
    element: (
      <MainLayout>
        <CategoryContainerAll />
      </MainLayout>
    )
  },
  {
    path: "/categories/:id",
    element: (
      <MainLayout>
        <CategoryDetailContainer />
      </MainLayout>
    )
  }
];
export default CategoriesRoutes;
