import HomePage from "../../pages/home/home";


const homeRoutes = [
  {
    path: "/",
    element: <HomePage cartCount={0} onSearchSubmit={() => {}} />,
  },
];

export default homeRoutes;