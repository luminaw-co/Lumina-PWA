import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify/functions";

export default defineConfig({
	site: "https://luminaw.co",
	base: "/",
	integrations: [tailwind(), mdx(), react()],
	output: "server",
	adapter: netlify(),
});
