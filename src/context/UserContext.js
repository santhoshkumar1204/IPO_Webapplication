import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  // Add a new user (email/password)
  const addUser = (user) => setUsers((prev) => [...prev, user]);

  // Add a new Google user
  const addGoogleUser = (user) => setUsers((prev) => [...prev, user]);

  // Check if a user exists by email
  const userExists = (email) => users.find((u) => u.email === email);

  // Validate login for email/password
  const validateLogin = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return { success: false, error: "Invalid email or password." };
    return { success: true, user };
  };

  // Validate Google user
  const validateGoogleUser = (email) => {
    const user = users.find((u) => u.email === email && u.authType === "google");
    if (!user) return { success: false, error: "No Google account found." };
    return { success: true, user };
  };

  // Reset password for a user
  const resetPassword = (email, newPassword) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.email === email ? { ...u, password: newPassword } : u
      )
    );
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        addGoogleUser,
        userExists,
        validateLogin,
        validateGoogleUser,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserContext);
}