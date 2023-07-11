"use client";

import { FunctionComponent } from "react";
import Link from "next/link";
import { useSession } from "@/hooks";

const Navbar: FunctionComponent = () => {
  const { isAuth } = useSession();

  const renderItems = () => {
    if (isAuth) {
      return (
        <>
          <li>
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          </li>
          <button>log out</button>
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
