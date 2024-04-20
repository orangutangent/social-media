import Container from "@/components/Container";
import UserAvatar from "./UserAvatar";
import useFollow from "@/hooks/useFollow";
import useCurrentUser from "@/hooks/useCurrentUser";
import Button from "../Button";
import { useRouter } from "next/navigation";

interface Props {
  user: any;
}

const UserHero: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const { isFollowing, toggleFollow } = useFollow(user.username);
  const { data: currentUser } = useCurrentUser();
  const isCurrent = currentUser?.id === user.id;
  return (
    <Container>
      <div className="flex justify-between">
        <div className="flex items-center m-4 gap-4">
          <div className="">
            <UserAvatar user={user} />
          </div>
          <div className="flex flex-col">
            <div
              onClick={() => router.push(`/users/${user.username}`)}
              className={`text-xl font-semibold text-indigo-500 cursor-pointer hover:underline `}
            >
              @{user.username}
            </div>
            <div className="text-xl ">{user?.name}</div>
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center mx-4">
          <Button
            isSmall
            actionLabel={isFollowing ? "Unfollow" : "Follow"}
            onClick={toggleFollow}
          />
        </div>
      </div>
    </Container>
  );
};

export default UserHero;
