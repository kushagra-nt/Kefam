"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { signupSchema, SignupValues } from "@/lib/validations";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(
  credentials: SignupValues,
): Promise<{ error: string }> {
  try {
    const { email, password, username } = signupSchema.parse(credentials);

    const userExistsWithSameUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    if (userExistsWithSameUsername) {
      return { error: "User with same username already exists" };
    }

    const userExistsWithSameEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });
    if (userExistsWithSameEmail) {
      return { error: "User with same email already exists" };
    }

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        id: userId,
        displayName: username,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");

  } catch (error) {
    if(isRedirectError(error))throw error;
    console.log(error);
    return {
      error: "Something went wrong, please try again.",
    };
  }
}
