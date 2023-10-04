"use client";
import { useMutation } from "@tanstack/react-query";
import { AuthError, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SyntheticEvent, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading } = useMutation(
    async () => {
      return signInWithEmailAndPassword(getAuth(), email, password);
    },
    {
      onSuccess: (userCredential) => {
        alert(`Selamat Datang Kembali , ${userCredential.user.displayName}`);
      },
      onError: (error: AuthError) => {
        alert(`Terjadi Kesalahan, ${error.message}`);
      },
    }
  );

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    mutate();
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-md min-h-screen mx-auto bg-white px-[24px]">
        <div className="pt-60">
          <h1 className="text-2xl text-center font-bold mb-4">WakafYuk</h1>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Your email address</Label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">Your password </Label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Harap Tunggu" : "Masuk"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
