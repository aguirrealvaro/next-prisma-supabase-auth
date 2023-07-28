"use client";

import { FunctionComponent } from "react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logOutSession } from "@/client/query-fns";
import { useSession } from "@/hooks";

const Navbar: FunctionComponent = () => {
  const router = useRouter();
  const { isAuth } = useSession();

  const logoutMutation = useMutation(logOutSession, {
    onSuccess: () => {
      router.refresh();
      router.push("/login");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const renderItems = () => {
    if (isAuth) {
      return (
        <>
          <li>
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          </li>
          <button onClick={handleLogout} className="text-blue-600">
            {logoutMutation.isLoading ? "Logging out..." : "Log out"}
          </button>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </li>
        </>
      );
    }
  };
  return (
    <header className="m-4">
      <nav>
        <ul className="flex justify-center gap-4">{renderItems()}</ul>
      </nav>
    </header>
  );
};

export { Navbar };
