import Image from "next/image";

interface Props {
  user: any;
  isLarge?: boolean;
}

const UserAvatar: React.FC<Props> = ({ user, isLarge = false }) => {
  return (
    <div className="rounded-full border-2 border-white w-fit ">
      {user?.image ? (
        <div className="flex justify-center">
          <Image
            src={user.image}
            width={isLarge ? 96 : 48}
            height={isLarge ? 96 : 48}
            alt="user image"
          />
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className={isLarge ? "w-20 h-20" : "w-12 h-12"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      )}
    </div>
  );
};

export default UserAvatar;
