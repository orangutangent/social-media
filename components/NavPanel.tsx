"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useLoginModal } from "@/hooks/useLoginModal";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const NavPanel = () => {
  const { user: currentUser } = useSession()?.data || {};

  const links = [
    {
      name: "Home",
      href: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      name: "Following",
      href: "/following",
      authRequired: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      ),
    },
    {
      name: "Profile",
      href: `/users/${currentUser?.username}`,
      authRequired: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ),
    },
  ];
  const router = useRouter();
  const loginModal = useLoginModal();
  const pathname = usePathname();
  return (
    <motion.div
      initial={{ opacity: 0, y: "-100px" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100px" }}
      transition={{ duration: 0.3 }}
      className="bg-slate-950 w-full h-16 fixed "
    >
      <div className="flex justify-center items-center gap-10 h-full">
        {links.map((link) =>
          link.authRequired && !currentUser ? null : (
            <Link
              key={link.name}
              href={link.href}
              className={`font-bold hover:scale-110 duration-300 ease-in-out active:scale-90 
            ${
              link.href === pathname
                ? "border-2 border-slate-700 bg-white text-slate-900 rounded-2xl p-2 "
                : " text-white"
            }
            `}
            >
              <div className="flex items-center gap-2">
                <div className="hidden sm:block">
                  {link.name === "Profile"
                    ? "@" + currentUser?.username
                    : link.name}
                </div>
                <div>{link.icon}</div>
              </div>
            </Link>
          )
        )}
        <div
          onClick={() => {
            if (currentUser) {
              signOut({ redirect: false });
              router.replace("/");
              toast.success("Logged out");
            } else {
              loginModal.setOpen();
            }
          }}
          className="font-bold hover:scale-110 duration-300 ease-in-out active:scale-90 cursor-pointer "
        >
          {currentUser ? (
            <div className="flex items-center gap-2">
              <p className="text-white hidden sm:block">Log Out</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            </div>
          ) : (
            "Sign In"
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NavPanel;
