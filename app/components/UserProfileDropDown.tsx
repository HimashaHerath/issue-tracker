import React from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IoMdArrowDropdown } from "react-icons/io";
import "./UserProfileDropDown.css";

function UserProfileDropDown() {
  const { data: session } = useSession();
  const avatarImage =
    session?.user?.image || "/path/to/default/avatar/image.png";
  const userInitials = session?.user?.name?.[0] || "U";

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Avatar className="user-avatar">
          <AvatarImage
            src={avatarImage}
            alt={`Avatar for ${session?.user?.name || "User"}`}
            sizes="1"
          />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </DropdownMenu.Trigger>
      <IoMdArrowDropdown />
      <DropdownMenu.Content className="radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down">
        <DropdownMenu.Item className="p-2 hover:bg-gray-100 cursor-pointer">
          Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item className="p-2 hover:bg-gray-100 cursor-pointer">
          Settings
        </DropdownMenu.Item>
        <DropdownMenu.Item className="p-2 hover:bg-gray-100 cursor-pointer">
          Logout
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default UserProfileDropDown;
