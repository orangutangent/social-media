"use client";
import React from "react";
import Modal from "../Modal";
import { useEditModal } from "@/hooks/useEditModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import Input from "../ui/Input";
import axios from "axios";
import toast from "react-hot-toast";
import useUser from "@/hooks/useUser";
import FileInput from "../ui/FileInput";

const EditModal = () => {
  const { data: CurrentUser } = useCurrentUser();
  const { mutate: mutateUser } = useUser(CurrentUser?.username);
  const [user, setUser] = React.useState({
    name: "",
    username: "",
    bio: "",
    image: "",
  });
  React.useEffect(() => {
    setUser({
      name: CurrentUser?.name,
      username: CurrentUser?.username,
      bio: CurrentUser?.bio,
      image: CurrentUser?.image || "",
    });
  }, [CurrentUser]);
  const onSubmit = async () => {
    try {
      const res = await axios.patch(
        `/api/users/${CurrentUser.username}`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        mutateUser();
        toast.success("Profile updated successfully");
        editModal.setClose();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editModal = useEditModal();
  const body = (
    <div className="flex flex-col gap-4 max-w-[400px] mx-auto">
      <Input
        placeholder="Name"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        value={user.name}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        value={user.username}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setUser({ ...user, bio: e.target.value })}
        value={user.bio}
      />
      <FileInput  onChange={(file) => setUser({ ...user, image: "" })} />
    </div>
  );
  return (
    <Modal
      title="Edit Profile"
      body={body}
      onSubmit={onSubmit}
      actionLabel="Update"
      isOpen={editModal.isOpen}
      onClose={editModal.setClose}
    />
  );
};

export default EditModal;
