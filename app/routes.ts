import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("events", "routes/events.tsx"),
    route("cities", "routes/cities.tsx"),
] satisfies RouteConfig;
