"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "../Form";
import React, { useRef, useState } from "react";
import Input from "../ui/Input";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../Container";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import Button from "../ui/Button";
import useCurrentUser from "@/hooks/useCurrentUser";

const CreatePost = () => {
  const { data: currentUser } = useCurrentUser();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isExpanded, setIsExpanded] = useState(false);

  const [formAnimation, setFormAnimation] = useState("hidden");
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const maxSymTitle = 50;
  const maxSymBody = 300;
  const { data: session } = useSession();
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const formBody = (
    <div className="flex flex-col gap-2 mx-8">
      <p className="text-gray-600 text-end">
        {title.length}/{maxSymTitle}
      </p>
      <Input
        type="text"
        placeholder="Title"
        maxLength={maxSymTitle}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p className="text-gray-600 text-end">
        {body.length}/{maxSymBody}
      </p>
      <textarea
        className="
        text-md p-2 mt-2 bg-black rounded-2xl border border-white shadow-sm focus: duration-300  "
        name="body"
        placeholder="Body"
        maxLength={maxSymBody}
        id=""
        cols={30}
        rows={6}
        value={body}
        onChange={(e) => {
          if (e.target.value.length > maxSymBody) {
            toast.error("Body is too long");
            return;
          }
          setBody(e.target.value);
        }}
      ></textarea>
    </div>
  );

  const onSubmit = async () => {
    try {
      if (!title || !body) {
        toast.error("Please add a title and body");
        return;
      }
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });
      if (res.ok) {
        toast.success("Post created");
        setFormAnimation("hidden");
        setIsExpanded(false);
        setTitle("");
        setBody("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!session?.user) {
    return (
      <div className="mt-4">
        <Container>
          <h1 className="text-2xl font-bold m-4">
            You need to be logged in to create a post
          </h1>
          <div className="flex gap-6 justify-center m-4">
            <Button
              actionLabel="Sign In"
              onClick={() => loginModal.setOpen()}
            />
            <Button
              secondary
              actionLabel="Sign Up"
              onClick={() => registerModal.setOpen()}
            />
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="mt-4">
      <Container>
        <div className="text-2xl font-bold my-4">{`${
          currentUser?.name || "@" + currentUser?.username
        }, anything to share?`}</div>
        <motion.button
          onClick={toggleExpand}
          initial={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
          animate={isExpanded ? "open" : "closed"}
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          className="mx-auto my-2 border-2 border-slate-700 rounded-xl p-2"
        >
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
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </motion.button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              exit={{ height: 0 }}
              animate={{ height: isExpanded ? "auto" : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onAnimationComplete={() => setFormAnimation("visible")}
              onAnimationStart={() => setFormAnimation("hidden")}
            >
              <motion.div
                initial="hidden"
                exit="hidden"
                animate={formAnimation}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Form
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    onSubmit();
                  }}
                  body={formBody}
                  actionLabel="Create Post"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default CreatePost;
