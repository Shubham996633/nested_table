"use client"
import Demo from "@/components/demo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Balancer from "react-wrap-balancer";

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col pt-24 px-5 gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 items-center lg:px-10">
        <h1 className="font-bold text-4xl">Shadcn Nested Data Table</h1>
        <h2 className="font-medium text-xl text-muted-foreground text-center px-10">
          <Balancer>
            Representation of Nested Data table with Shadcn UI, Radix
            Colors and React Tanstack Query/Table
          </Balancer>
        </h2>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-4 items-center">
          <Button asChild>
            <Link
              href="https://github.com/Shubham996633/nested_table"
              target="_blank"
            >
              <Star className="mr-2 size-4" />
              GitHub
            </Link>
          </Button>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="my-4">
        <Suspense>
          <Demo />
        </Suspense>
      </div>
    </main>
  );
}