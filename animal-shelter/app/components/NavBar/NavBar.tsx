"use client";
import React from "react";
import "./NavBar.module.css";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import classNames from "classnames";

export default function NavBar() {
  const [navBarOpen, setNavBarOpen] = React.useState(false);
  return (
    <nav
      className="sticky top-0 shadow-sm z-50 bg-white border-gray-200
            border-b-4 border-solid"
    >
      <div className="flex justify-around container mx-auto py-2">
        <Link href={"/"} className="nav-link">
          <h1 className="text-2xl font-bold">Brad's Example Animal Shelter</h1>
        </Link>
        <span
          onClick={() => setNavBarOpen(!navBarOpen)}
          className="md:hidden cursor-pointer self-center"
        >
          {!navBarOpen ? (
            <RxHamburgerMenu className="text-4xl" />
          ) : (
            <IoCloseSharp className="text-4xl" />
          )}
        </span>
        <ul
          className={classNames(
            `absolute left-0 bg-white w-full
                    flex flex-col items-center gap-8 md:static md:flex-row
                    md:justify-end md:flex-wrap md:max-w-[32-rem] md:p-0.5`,
            `${navBarOpen ? "top-[52px]" : "top-[-1000px]"}`,
          )}
        >
          <li>
            <Link href={"/pets"} className="nav-link">
              Pets
            </Link>
          </li>
          <li>
            <Link href={"/intake"} className="nav-link">
              Intake
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
