import { authRoutes } from "./modules/auth.routes";
import { brandRoutes } from "./modules/brand.routes";
import { productRoutes } from "./modules/product.routes";

export const publicRoutes = [...authRoutes, ...productRoutes, ...brandRoutes];
