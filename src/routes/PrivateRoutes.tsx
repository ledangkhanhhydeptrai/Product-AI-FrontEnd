import { brandRoutes } from "./modules/brand.routes";
import CategoriesRoutes from "./modules/categories.routes";
import { dashboardRoutes } from "./modules/dashboard.routes";
import { productRoutes } from "./modules/product.routes";

export const privateRoutes = [
  ...productRoutes,
  ...dashboardRoutes,
  ...brandRoutes,
  ...CategoriesRoutes
];
