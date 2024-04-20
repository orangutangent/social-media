"use client";
import UserHero from "@/components/user/UserHero";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useUsers } from "@/hooks/useUsers";

const Following = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: users } = useUsers(currentUser?.id);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl text-white bg-indigo-900 rounded-2xl p-2 mt-4">
        People you are following
      </h1>
      {users?.map((user: any) => (
        <UserHero key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Following;
