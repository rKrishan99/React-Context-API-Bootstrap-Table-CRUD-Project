import { createContext, useState } from "react";

export const UserContext = createContext(null);
import React from "react";

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id, name, age) => {
    const affectedUser = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name: name,
          age: age,
        };
      }
      return user;
    });
    setUsers(affectedUser);
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
