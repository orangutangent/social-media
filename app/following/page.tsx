"use client";
import SearchPanel from "@/components/SearchPanel";
import UserHero from "@/components/user/UserHero";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useUsers } from "@/hooks/useUsers";
import { motion } from "framer-motion";

const Following = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: users } = useUsers(currentUser?.id);
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <SearchPanel />
      <motion.h1
        initial={{ opacity: 0, x: "-100px" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="text-2xl text-white bg-indigo-900 rounded-2xl p-2 mt-4"
      >
        People you are following
      </motion.h1>
      <div className="flex flex-col gap-4 mt-4 w-full">
        {users?.map((user: any) => (
          <UserHero key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Following;
