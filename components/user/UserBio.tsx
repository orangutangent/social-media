"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import Button from "../ui/Button";
import Container from "@/components/Container";
import Image from "next/image";
import { useEditModal } from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";
import UserAvatar from "./UserAvatar";
interface Props {
  user: any;
}

const UserBio: React.FC<Props> = ({ user }) => {
  const { isFollowing, toggleFollow, isLoading } = useFollow(user.username);
  const editModal = useEditModal();
  const { data: currentUser } = useCurrentUser();
  const isCurrentUser = currentUser?.id === user.id;
  return (
    <div className="mt-4">
      <Container>
        <div className="flex flex-col m-4">
          <div className="flex flex-col justify-center items-center gap-2">
            <UserAvatar user={user} isLarge />
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <h1 className="text-xl font-bold rounded-2xl bg-indigo-500 px-2">
                @{user.username}
              </h1>
              {isCurrentUser && (
                <p className={`text-xl `}>Your email: {user.email}</p>
              )}
              <p className="text-xl bg-emerald-500 px-2 rounded-2xl ">
                {user.bio}
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-10 text-xl  my-4 ">
            <div className="flex flex-col text-emerald-500">
              <p>{user.followersIds?.length}</p>
              <p className="">Followers</p>
            </div>
            <div className="flex flex-col text-indigo-500">
              <p>{user.followingIds?.length}</p>
              <p className="">Following</p>
            </div>
          </div>

          {isCurrentUser ? (
            <Button
              onClick={editModal.setOpen}
              actionLabel="Edit Profile"
              secondary
            />
          ) : (
            <Button
              disabled={isLoading}
              onClick={toggleFollow}
              actionLabel={isFollowing ? "Unfollow" : "Follow"}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default UserBio;
