"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { connectAuthEmulator, getAuth } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7zwPCv0Lmv2vZBJcse_O0Wv-C4-mMHgE",
  authDomain: "wakafyuk-102a0.firebaseapp.com",
  projectId: "wakafyuk-102a0",
  storageBucket: "wakafyuk-102a0.appspot.com",
  messagingSenderId: "776963877118",
  appId: "1:776963877118:web:0c5f393157cced921e9daf",
  measurementId: "G-YY9T8H96HR",
};

const inter = Inter({ subsets: ["latin"] });

// Create a client
const queryClient = new QueryClient();

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFirebaseAppInitialized, setIsFirebaseAppInitialized] =
    useState(false);

  function initializeFirebase() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    const storage = getStorage(app);

    if (process.env.NODE_ENV === "development") {
      connectAuthEmulator(auth, "http://localhost:9099");
      connectFirestoreEmulator(db, "localhost", 8080);
      connectStorageEmulator(storage, "localhost", 9199);
    }

    setIsFirebaseAppInitialized(true);
  }

  useEffect(() => {
    if (!isFirebaseAppInitialized) {
      initializeFirebase();
    }
  }, [isFirebaseAppInitialized]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          {isFirebaseAppInitialized ? children : <p>Loading...</p>}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
