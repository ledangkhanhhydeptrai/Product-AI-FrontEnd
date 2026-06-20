import { brandRoutes } from "./modules/brand.routes";
import { CartRoutes } from "./modules/cart.routes";
import CategoriesRoutes from "./modules/categories.routes";
import { dashboardRoutes } from "./modules/dashboard.routes";
import { OrderRoutes } from "./modules/order.routes";
import PaymentRoutes from "./modules/payment.routes";
import { productRoutes } from "./modules/product.routes";
import { profileRoutes } from "./modules/profile.routes";

export const privateRoutes = [
  ...productRoutes,
  ...dashboardRoutes,
  ...brandRoutes,
  ...CategoriesRoutes,
  ...CartRoutes,
  ...profileRoutes,
  ...OrderRoutes,
  ...PaymentRoutes
];
