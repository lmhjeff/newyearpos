import { AssetSource, defineConfig, isDev } from "sanity";

import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";

import { visionTool } from "@sanity/vision";

const devOnlyPlugins = [visionTool()];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/studio",
  name: "EXJAPAN_POS-System",
  title: "Exjapan-POS-System",

  projectId,
  dataset,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
