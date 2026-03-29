import { type UserStore, type Status, type User } from "./../types/user";
import { create } from "zustand";

interface UsersStore {
  users: UserStore[];
  setUsers: (users: UserStore[]) => void;
  setUserStatus: (userId: User["id"], status: Status) => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  setUsers: (users) =>
    set(() => ({
      users: users,
    })),
  setUserStatus: (userId, status) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, status: status } : user,
      ),
    })),
}));
