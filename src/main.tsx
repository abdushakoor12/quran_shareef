import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SurahsPage from "./SurahsPage.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import SurahDetailsPage from "./SurahDetailsPage.tsx";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <div className="flex flex-col w-full items-center justify-center">
      <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
        <li>
          <Link to="/surahs">Surahs</Link>
        </li>
        <li>
          <a>Juz</a>
        </li>
        <li>
          <a>Manzil</a>
        </li>
      </ul>
      <div className="h-2"/>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <></>,
});

const surahsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/surahs",
  component: () => <SurahsPage />,
});

const surahDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/surah/$surahNumber",
  component: () => <SurahDetailsPage />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  surahsRoute,
  surahDetailsRoute,
]);

const router = createRouter({ routeTree, defaultPreload: "intent" });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
