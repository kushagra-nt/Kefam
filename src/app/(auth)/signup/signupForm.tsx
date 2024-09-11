"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupValues } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "./actions";
import { PasswordInput } from "@/components/ui/password-input";
import LoadingButton from "@/components/ui/loading-button";

export default function SignupForm() {
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const [error, setError] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: SignupValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signUp(values);
      if (error) setError(error);
    });
  }

  return (
    <Form {...form}>
      {error && <p className="text-center text-destructive">{error}</p>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <LoadingButton type="submit" className="w-full" loading={isPending}>
          Create Account
        </LoadingButton>
      </form>
    </Form>
  );
}
