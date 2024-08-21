import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import { LinkIcon, LogOut } from "lucide-react";

function Header() {
    const navigate = useNavigate()
  const user = true;
  return (
    <>
      <div className="py-8 px-16 flex justify-between items-center">
        <Link>
          <img src="/public/logo.png" className="h-16" alt="Trimrr Logo" />
        </Link>
        <div className="flex gap-4">
          {user ? (
            <Button onClick={()=>{navigate("/auth")}}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link className="flex" to={"/dashboard"}>
                      <LinkIcon className="mr-2 h-4 w-4"/> My Links
                     </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                     <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
