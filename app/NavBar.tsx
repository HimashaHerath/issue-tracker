"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import SigninButton from "./components/SignInButton";
import { useSession } from "next-auth/react";
import UserProfileDropDown from "./components/UserProfileDropDown";

function NavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const avatarImage =
    session?.user?.image || "/path/to/default/avatar/image.png";
  const userInitials = session?.user?.name?.[0] || "";

  return (
    <nav className="flex justify-between items-center border-b mb-5 px-6 h-14">
      <div className="flex space-x-6 items-center">
        <Link href="/" passHref>
          <div className="cursor-pointer">
            <AiFillBug />
          </div>
        </Link>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <li
              key={link.href}
              className={classnames({
                "text-green-500": link.href === pathname,
                "text-zinc-500": link.href !== pathname,
                "hover:text-red-300 transition-colors": true,
              })}
            >
              <Link href={link.href} passHref>
                <div className="cursor-pointer">{link.label}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center">
        {!session ? <SigninButton /> : <UserProfileDropDown />}
      </div>
    </nav>
  );
}

export default NavBar;
