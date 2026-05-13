import { PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w6xl p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl sm:text-5xl font-bold text-primary font-mono tracking-tight relative animate-pulse">
            ThinkBoard
          </h1>
          <Link to="/create" className="btn btn-primary gap-2">
            <PlusIcon className="size-4 sm:size-5" />
            <span>New Note</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
