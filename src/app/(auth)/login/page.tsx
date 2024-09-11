import { Metadata } from "next";
import LoginImage from "@/assets/login-image.jpg";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./loginForm";

export const metadata: Metadata = {
  title: "Log in",
};

export default function Signup() {
  return (
    <main className="flex h-screen justify-center p-5 align-middle">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto px-5 py-8 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Log in to Kefam</h1>
            <p className="text-muted-foreground">
              A place just for aesthetic cafes
            </p>
          </div>
          <div className="space-y-5">
            <LoginForm />

            <div className="text-center">
              <Link href="/signup" className="hover:underline">
                Don&apos;t have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden w-1/2 md:block">
          <Image src={LoginImage} alt="" className="h-full" />
        </div>
      </div>
    </main>
  );
}
