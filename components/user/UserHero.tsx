import Container from "@/components/Container";
import UserAvatar from "./UserAvatar";
import useFollow from "@/hooks/useFollow";
import useCurrentUser from "@/hooks/useCurrentUser";
import Button from "../Button";

interface Props {
  user: any;
}

const UserHero: React.FC<Props> = ({ user }) => {
  const { isFollowing, toggleFollow } = useFollow(user.username);
  const { data: currentUser } = useCurrentUser();
  const isCurrent = currentUser?.id === user.id;
  return (
    <div className="mt-2">
      <Container>
        <div className="flex justify-between">
          <div className="flex items-center m-4 gap-4">
            <div className="">
              <UserAvatar user={user} />
            </div>
            <div className="flex flex-col">
              <div
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
    </div>
  );
};

export default UserHero;
