"use client";

import { FunctionComponent } from "react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { logOutSession } from "@/client/query-fns";
import { useSession } from "@/hooks";

const Navbar: FunctionComponent = () => {
  const { isAuth } = useSession();

  const signInMutation = useMutation(logOutSession);

  const handleLogout = () => {
    signInMutation.mutate();
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
            log out
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
