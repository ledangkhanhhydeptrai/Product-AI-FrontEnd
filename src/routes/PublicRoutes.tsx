import { ChatRoutes } from "./modules/aiChat.routes";
import { authRoutes } from "./modules/auth.routes";
import { brandRoutes } from "./modules/brand.routes";
import CategoriesRoutes from "./modules/categories.routes";
import homeRoutes from "./modules/home.routes";

import { productRoutes } from "./modules/product.routes";

export const publicRoutes = [
  ...authRoutes,
  ...productRoutes,
  ...brandRoutes,
  ...homeRoutes,
  ...CategoriesRoutes,
  ...ChatRoutes
];
