import CategoryContainer from "../../admin/category/categoryContainer/categoryContainer";
import { AdminLayout } from "../../admin/layouts/AdminLayout";
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
  },
  {
    path: "/admin/category",
    element: (
      <AdminLayout>
        <CategoryContainer />
      </AdminLayout>
    )
  }
];
export default CategoriesRoutes;
