import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ArchivedUserCard from "../components/ArchivedUserCard";
import UserCard from "../components/UserCard";
import { fetchUsers } from "../api/users";
import { useUsersStore } from "../store/usersStore";
import type { User } from "../types/user";

export default function UsersPage() {
  const [idMenuOpen, setIdMenuOpen] = useState<null | User["id"]>(null);
  const users = useUsersStore((state) => state.users);
  const setUsers = useUsersStore((state) => state.setUsers);
  const hasUsers = users.length > 0;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: !hasUsers,
  });

  const activeUsers = useMemo(
    () => users.filter((user) => user.status === "active"),
    [users],
  );

  const archivedUsers = useMemo(
    () => users.filter((user) => user.status === "archived"),
    [users],
  );

  useEffect(() => {
    if (!hasUsers && data) {
      setUsers(
        data.map((user) => ({
          ...user,
          status: "active",
        })),
      );
    }
  }, [data, hasUsers, setUsers]);

  if (isLoading)
    return (
      <div className="loading">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <g>
            <circle cx="12" cy="3" r="1" fill="#888888">
              <animate
                id="SVGelgoqhuA"
                attributeName="r"
                begin="0;SVGSRzJybSJ.end-0.5s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="16.5" cy="4.21" r="1" fill="#888888">
              <animate
                id="SVGBcQu6cCi"
                attributeName="r"
                begin="SVGelgoqhuA.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="7.5" cy="4.21" r="1" fill="#888888">
              <animate
                id="SVGSRzJybSJ"
                attributeName="r"
                begin="SVGeZGzNdVZ.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="19.79" cy="7.5" r="1" fill="#888888">
              <animate
                id="SVGG5Q0fe0M"
                attributeName="r"
                begin="SVGBcQu6cCi.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="4.21" cy="7.5" r="1" fill="#888888">
              <animate
                id="SVGeZGzNdVZ"
                attributeName="r"
                begin="SVGUTnihcal.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="21" cy="12" r="1" fill="#888888">
              <animate
                id="SVG8aQG8dpc"
                attributeName="r"
                begin="SVGG5Q0fe0M.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="3" cy="12" r="1" fill="#888888">
              <animate
                id="SVGUTnihcal"
                attributeName="r"
                begin="SVGHktsvT5Q.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="19.79" cy="16.5" r="1" fill="#888888">
              <animate
                id="SVGqCF3Scrd"
                attributeName="r"
                begin="SVG8aQG8dpc.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="4.21" cy="16.5" r="1" fill="#888888">
              <animate
                id="SVGHktsvT5Q"
                attributeName="r"
                begin="SVGSFNCBbxb.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="16.5" cy="19.79" r="1" fill="#888888">
              <animate
                id="SVGMFYo1cJN"
                attributeName="r"
                begin="SVGqCF3Scrd.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="7.5" cy="19.79" r="1" fill="#888888">
              <animate
                id="SVGSFNCBbxb"
                attributeName="r"
                begin="SVGLSoLpdOI.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="12" cy="21" r="1" fill="#888888">
              <animate
                id="SVGLSoLpdOI"
                attributeName="r"
                begin="SVGMFYo1cJN.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <animateTransform
              attributeName="transform"
              dur="6s"
              repeatCount="indefinite"
              type="rotate"
              values="360 12 12;0 12 12"
            />
          </g>
        </svg>
      </div>
    );
  if (isError) return <div className="error">Ошибка при загрузке данных</div>;

  return (
    <main onClick={() => setIdMenuOpen(null)}>
      <div className="main-wrapper">
        <div className="headline">
          <p>Активные</p>
        </div>
        <div className="cards-wrapper">
          {activeUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              idMenuOpen={idMenuOpen}
              setIdMenuOpen={setIdMenuOpen}
            />
          ))}
        </div>
        <div className="headline">
          <p>Архив</p>
        </div>
        <div className="cards-wrapper">
          {archivedUsers.map((user) => (
            <ArchivedUserCard
              key={user.id}
              user={user}
              idMenuOpen={idMenuOpen}
              setIdMenuOpen={setIdMenuOpen}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
