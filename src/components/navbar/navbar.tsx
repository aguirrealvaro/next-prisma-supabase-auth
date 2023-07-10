import { FunctionComponent } from "react";
import Link from "next/link";

const Navbar: FunctionComponent = () => {
  return (
    <header className="m-4">
      <nav>
        <ul className="flex justify-center gap-4">
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
        </ul>
      </nav>
    </header>
  );
};

export { Navbar };
