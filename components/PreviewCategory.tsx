"use client";

import { usePreview } from "../lib/sanity.preview";
import Category from "./Category";
type Props = {
  query: string;
};

export default function PreviewCategory({ query }: Props) {
  const category = usePreview(null, query);

  return <Category category={category} />;
}
