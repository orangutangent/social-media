"use client";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import Modal from "../Modal";
import Input from "@/components/Input";
import React from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

const loginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        username: user.email,
        password: user.password,
        redirect: false,
      });
      if (res?.error) {
        setError(res?.error);
      }
      if (res?.ok) {
        setError("");
        loginModal.setClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const body = (
    <div>
      <form className="flex flex-col gap-4 max-w-[400px] mx-auto">
        <Input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email or Username"
          name="email"
          type="email"
        />
        <Input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          name="password"
          type="password"
        />
        {error && (
          <motion.div
            initial={{ opacity: 0, y: "-100px" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100px" }}
            transition={{ duration: 0.3 }}
            className="text-red-500 text-center"
          >
            {error}
          </motion.div>
        )}
      </form>
    </div>
  );

  const footer = (
    <span
      className="text-gray-500 text-center cursor-pointer hover:underline transition"
      onClick={() => {
        loginModal.setClose();
        registerModal.setOpen();
      }}
    >
      {"Don't have an account?"}
    </span>
  );

  return (
    <Modal
      onClose={loginModal.setClose}
      onSubmit={onSubmit}
      title="Log In"
      actionLabel={loading ? "Loading..." : "Log In"}
      isOpen={loginModal.isOpen}
      body={body}
      footer={footer}
      disabled={loading}
    />
  );
};

export default loginModal;
