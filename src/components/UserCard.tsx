import { Link } from "react-router-dom";
import type { User } from "../types/user";
import { useUsersStore } from "../store/usersStore";

interface UserCardProps {
  user: User;
  idMenuOpen: null | User["id"];
  setIdMenuOpen: (value: null | User["id"]) => void;
}

export default function UserCard({
  user,
  idMenuOpen,
  setIdMenuOpen,
}: UserCardProps) {
  const setUserStatus = useUsersStore((state) => state.setUserStatus);

  return (
    <div className="card">
      <div className="user-photo-wrapper"></div>
      <div className="user-info">
        <div>
          <div className="more-information">
            <p className="user-name">{user.name}</p>
            <div className="options-wrapper">
              <svg
                onClick={(e) => {
                  e.stopPropagation();
                  setIdMenuOpen(user.id);
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_10_6608)">
                  <path
                    d="M10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16C10.9 16 10 16.9 10 18ZM10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6ZM10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12Z"
                    fill="#161616"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_10_6608">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {idMenuOpen === user.id && (
                <div className="pop-up pop-up-edit">
                  <Link
                    className="pop-up-section"
                    to={`/users/${user.id}/edit`}
                  >
                    Редактировать
                  </Link>
                  <button
                    className="pop-up-section"
                    onClick={() => setUserStatus(user.id, "archived")}
                  >
                    Архивировать
                  </button>
                  <button
                    className="pop-up-section"
                    onClick={() => setUserStatus(user.id, "hidden")}
                  >
                    Скрыть
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="user-company">{user.companyName}</p>
        </div>
        <p className="user-location">{user.city}</p>
      </div>
    </div>
  );
}
