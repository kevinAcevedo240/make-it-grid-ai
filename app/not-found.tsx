import { Button } from "@/components/ui/button";
import Link from "next/link";


export const metadata = {
  title: "Page Not Found | MakeItGrid",
  description: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="dark:bg-black-100 w-full h-screen flex flex-col lg:flex-row items-center justify-center space-y-12 lg:space-y-0 space-x-8 2xl:space-x-0">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
        <h1 className=" md:mt-0 text-7xl sm:text-9xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-500  from-neutral-500 to-neutral-900">
          404
        </h1>
        <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-muted-foreground mt-2">
          Page Not Found
        </p>
        <p className="text-xl md:text-xl lg:text-2xl  text-muted-foreground my-12 mx-4">
          Sorry, We can&apos;t find that page. You&apos;ll find lots to explore
          on the home page.
        </p>
        <Button className="shadow-2xl">
          <Link href={"/"}>
            <span className=" whitespace-pre-wrap text-center  font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 text-xl">
              Back To Home Page
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
