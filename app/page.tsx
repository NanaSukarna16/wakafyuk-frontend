"use client";
import { useMutation } from "@tanstack/react-query";
import {
  AuthError,
  getAuth,
  signInWithCustomToken,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SyntheticEvent, useState } from "react";
import axios, { AxiosError } from "axios";

type ApiError = {
  statusCode: number;
  message: string;
};

const isEmail = (email: String) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading } = useMutation(
    async () => {
      const auth = getAuth();
      if (isEmail(email)) {
        return signInWithEmailAndPassword(auth, email, password);
      }

      const res = await axios.post(
        "http://localhost:3001/auth/username_login",
        {
          username: email,
          password: password,
        }
      );

      return signInWithCustomToken(auth, res.data.token);
    },

    {
      onSuccess: (userCredential) => {
        alert(`Selamat Datang Kembali , ${userCredential.user.displayName}`);
      },
      onError: (error: AuthError | AxiosError) => {
        if ("response" in error && error.response) {
          const errorResponse = error.response.data as ApiError;
          alert(`Terjad Kesalahan. ${errorResponse.message || ""}`);
        } else {
          alert(`Terjadi Kesalahan, ${error.message || ""}`);
        }
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
            <div className="grid gap-2">
              <Label htmlFor="email">Your email address or username</Label>
              <Input
                type="text"
                placeholder="Email atau Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <p className="text-muted-foreground text-sm">
                {isEmail(email)
                  ? "Anda akan login menggunakan email"
                  : "Anda akan login menggunakan username"}
              </p>
            </div>

            <div className="grid gap-2">
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
