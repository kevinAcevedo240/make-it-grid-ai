'use client'

import GridEditor from "@/components/GridEditor";
import ExampleGrid from "@/components/React-grid-layout";
import GridExample from "@/components/gridExample";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      {/* <GridEditor /> */}
      <ExampleGrid />
      {/* <GridExample/> */}
    </>
  );
}