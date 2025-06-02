import React from "react";

export const Navbar = ({ children }: { children: React.ReactNode }) => (
  <div className="navbar !sticky top-0 left-0 z-10 bg-base-100 px-3">
    <div className="navbar-start flex gap-1">
      <a href="/" className="text-2xl font-extrabold">
        Recipes Suggest
      </a>
    </div>
  </div>
);

export default Navbar;
