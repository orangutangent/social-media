"use client";
import { useState } from "react";
import Container from "./Container";
import Input from "./ui/Input";
import Button from "./ui/Button";
import axios from "axios";
import UserHero from "./user/UserHero";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const SearchPanel = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const onClear = () => {
    setSearch("");
    setUsers([]);
    setIsLoading(false);
  };
  const onSearch = async () => {
    try {
      if (!search) {
        toast.error("Please enter a search term");
        return;
      }
      setIsLoading(true);
      const res = await axios.get(`/api/users?search=${search}`);
      if (res.status!=200) {
        setUsers([]);
        setIsLoading(false);
        toast.error("No users found");
        return;
      }
      setUsers(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-4 w-full">
      <Container>
        <motion.div className="flex flex-col gap-2 my-4 mx-4  ">
          <div className="flex flex-col sm:flex-row gap-2 justify-center w-full items-center ">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
            <div className="flex flex-row gap-2">
              <Button
                disabled={isLoading}
                actionLabel="Enter"
                isSmall
                secondary
                onClick={onSearch}
              />
              <Button actionLabel="Clear" isSmall onClick={onClear} />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            {users.length > 0 ? (
              <h1 className="text-2xl font-bold mt-4">Users</h1>
            ):(
              search && <h1 className="text-2xl font-bold mt-4">No users found</h1>
            )}
            { users?.map((user: any) => (
              <UserHero key={user.id} user={user} />
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default SearchPanel;
