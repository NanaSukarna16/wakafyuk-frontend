import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-md min-h-screen mx-auto bg-white px-[24px]">
        <div className="pt-60">
          <h1 className="text-2xl text-center font-bold mb-4">WakafYuk</h1>

          <form className="grid gap-4">
            <div>
              <Label htmlFor="email">Your email address</Label>
              <Input type="email" placeholder="Email" />
            </div>

            <div>
              <Label htmlFor="password">Your password </Label>
              <Input type="password" placeholder="Password" />
            </div>

            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
