"use client";

import { FormEvent, FunctionComponent } from "react";

export const Register: FunctionComponent = () => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-4 last:mb-4">
          <label htmlFor="email">Email: </label>
          <input type="text" id="email" className="rounded border border-neutral-600 px-2" />
        </div>
        <div className="mb-4 last:mb-4">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            className="rounded border border-neutral-600 px-2"
          />
        </div>
        <button type="submit" className="rounded bg-blue-600 p-2 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
