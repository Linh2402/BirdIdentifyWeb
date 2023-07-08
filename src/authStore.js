import create from "zustand";
import {path} from "./constant";

const useAuthStore = create((set) => {
  const storedToken = localStorage.getItem("token");
  const loggedIn = storedToken ? true : false;

  return {
    token: storedToken || "",
    loggedIn,

    login: async (email, password) => {
      try {
        const response = await fetch(path + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email, password}),
        });

        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          set({token, loggedIn: true});
          localStorage.setItem("token", token);
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        console.error(error);
      }
    },

    logout: () => {
      set({token: "", loggedIn: false});
      localStorage.removeItem("token");
    },
    verifyToken: async () => {
      try {
        const response = await fetch(path + "/verifyToken", {
          method: "GET",
          headers: {
            Authorization: `${storedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Token is invalid");
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  };
});

export default useAuthStore;
