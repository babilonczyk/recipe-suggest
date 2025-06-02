import RootLayout from "./pages/root-layout";
import RecipesList from "./pages/recipes/list/recipes-list";
import RecipesLayout from "./pages/recipes/layout/recipes-layout";

const routes = [
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "",
        Component: RecipesLayout,
        children: [{ index: true, Component: RecipesList }],
      },
      {
        path: "recipes",
        Component: RecipesLayout,
        children: [{ index: true, Component: RecipesList }],
      },
    ],
  },
];

export default routes;
