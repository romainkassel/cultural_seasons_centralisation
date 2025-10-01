import { Events } from "~/events/events";
import type { Route } from "./+types/events";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Event() {
  return <Events />;
}
