import { Cities } from "~/cities/cities";
import type { Route } from "./+types/cities";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function City() {
  return <Cities />;
}
