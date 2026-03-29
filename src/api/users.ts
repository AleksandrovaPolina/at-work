import type { ApiUser } from "../types/user";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function transformUser(user: ApiUser) {
  const updatedUser = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    city: user.address.city,
    phone: user.phone,
    companyName: user.company.name,
  };
  return updatedUser;
}

export async function fetchUsers() {
  const resp = await fetch(`${API_BASE_URL}/users?_limit=6`);
  if (!resp.ok) throw new Error("Не удалось загрузить список пользователей");
  const usersApi: ApiUser[] = await resp.json();
  const users = usersApi.map((user) => transformUser(user));
  return users;
}
