import type { User } from "../types/user";
import { useUsersStore } from "../store/usersStore";

interface ArchivedUserCardProps {
  user: User;
  idMenuOpen: null | User["id"];
  setIdMenuOpen: (value: null | User["id"]) => void;
}

export default function ArchivedUserCard({
  user,
  idMenuOpen,
  setIdMenuOpen,
}: ArchivedUserCardProps) {
  const setUserStatus = useUsersStore((state) => state.setUserStatus);

  return (
    <div className="card">
      <div className="user-photo-wrapper archive-photo"></div>
      <div className="user-info">
        <div>
          <div className="more-information">
            <p className="user-name archive-name">{user.name}</p>
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
              <div className="pop-up pop-up-archive">
                <button
                  className="pop-up-section"
                  onClick={() => setUserStatus(user.id, "active")}
                >
                  Активировать
                </button>
              </div>
            )}
          </div>
          <p className="user-company archive-company">At-Work</p>
        </div>
        <p className="user-location archive-location">Санкт-Петербург</p>
      </div>
    </div>
  );
}
