import { Application } from "./deps.ts";
import { bold, green } from "https://deno.land/std@0.51.0/fmt/colors.ts";

const app = new Application();
console.log(bold(green("Server listening ->")), "http://localhost:8000");
await app.listen({ port: 8000 });
