"use client";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import Modal from "../Modal";
import Input from "@/components/ui/Input";
import React from "react";
import toast from "react-hot-toast";
import isEmail from "@/libs/isEmail";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async () => {
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      setError("Passwords do not match");
      return;
    }
    if (!user.email || !user.username || !user.password) {
      toast.error("Please fill in all fields");
      setError("Please fill in all fields");
      return;
    }
    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setError("Password must be at least 6 characters");
      return;
    }
    if (!isEmail(user.email)) {
      toast.error("Please enter a valid email");
      setError("Please enter a valid email");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          username: user.username,
          password: user.password,
        }),
      });
      console.log(res);
      await signIn("credentials", {
        username: user.username,
        password: user.password,
        redirect: false,
      });
      registerModal.setClose();
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
          placeholder="Email"
          name="email"
          type="email"
        />
        <Input
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
          name="username"
          type="text"
        />
        <Input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          name="password"
          type="password"
        />
        <Input
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
        />
      </form>
      <motion.p
        key={error}
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: "10px", opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-red-500 text-center mt-4"
      >
        {error}
      </motion.p>
    </div>
  );

  const footer = (
    <span
      className="text-gray-500 text-center cursor-pointer hover:underline transition"
      onClick={() => {
        registerModal.setClose();
        loginModal.setOpen();
      }}
    >
      {"Already have an account?"}
    </span>
  );

  return (
    <Modal
      onClose={registerModal.setClose}
      onSubmit={onSubmit}
      title={loading ? "Creating..." : "Create new account"}
      actionLabel="Register"
      isOpen={registerModal.isOpen}
      body={body}
      footer={footer}
      disabled={loading}
    />
  );
};

export default RegisterModal;
