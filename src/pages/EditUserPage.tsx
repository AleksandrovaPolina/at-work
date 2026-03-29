import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

import { userFormSchema, type UserFormValues } from "../schemas/userFormSchema";
import { useUsersStore } from "../store/usersStore";
import type { User } from "../types/user";

export default function EditUserPage() {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const users = useUsersStore((state) => state.users);
  const setUsers = useUsersStore((state) => state.setUsers);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const user = useMemo(
    () => users.find((item) => item.id === Number(userId)),
    [users, userId],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      city: user?.city || "",
      phone: user?.phone || "",
      companyName: user?.companyName || "",
    },
  });

  useEffect(() => {
    if (!isSuccessPopupOpen) return;

    const timeoutId = window.setTimeout(() => {
      setIsSuccessPopupOpen(false);
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [isSuccessPopupOpen]);

  function closeSuccessPopup() {
    setIsSuccessPopupOpen(false);
  }

  function onSubmit(values: UserFormValues) {
    const updatedUsers = users.map((item) =>
      item.id === Number(userId) ? { ...item, ...values } : item,
    );

    setUsers(updatedUsers);
    queryClient.setQueryData<User[]>(["users"], (currentUsers) =>
      currentUsers?.map((item) =>
        item.id === Number(userId) ? { ...item, ...values } : item,
      ),
    );
    setIsSuccessPopupOpen(true);
  }

  return (
    <>
      <div className="edit-page-wrapper">
        <div className="edit-page">
          <div className="back-navigation">
            <Link to="/" className="back-navigation-link">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 9H0.75"
                  stroke="#161616"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 14.25L0.75 9L6 3.75"
                  stroke="#161616"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Назад</p>
            </Link>
          </div>
          <div className="edit-profile-wrapper">
            <div className="edit-profile-settings">
              <div className="profile-photo-wrapper"></div>
              <div className="edit-sections">
                <p className="edit-section">Данные профиля</p>
                <p className="edit-section">Рабочее пространство</p>
                <p className="edit-section">Приватность</p>
                <p className="edit-section">Безопасность</p>
              </div>
            </div>
            <div className="form-wrapper">
              <p className="form-title">Данные профиля</p>
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <label className="label" htmlFor="name">
                  Имя
                </label>
                <input
                  className="input"
                  type="text"
                  id="name"
                  {...register("name")}
                />
                {errors.name && <p className="error">{errors.name.message}</p>}
                <label className="label" htmlFor="username">
                  Никнейм
                </label>
                <input
                  className="input"
                  type="text"
                  id="username"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="error">{errors.username.message}</p>
                )}
                <label className="label" htmlFor="email">
                  Почта
                </label>
                <input
                  className="input"
                  type="email"
                  id="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
                <label className="label" htmlFor="city">
                  Город
                </label>
                <input
                  className="input"
                  type="text"
                  id="city"
                  {...register("city")}
                />
                {errors.city && <p className="error">{errors.city.message}</p>}
                <label className="label" htmlFor="phone">
                  Телефон
                </label>
                <input
                  className="input"
                  type="tel"
                  id="phone"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="error">{errors.phone.message}</p>
                )}
                <label className="label" htmlFor="companyName">
                  Название компании
                </label>
                <input
                  className="input"
                  type="text"
                  id="companyName"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="error">{errors.companyName.message}</p>
                )}
                <button className="btn" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Сохранение..." : "Сохранить"}
                </button>
              </form>
            </div>
          </div>
        </div>
        {isSuccessPopupOpen && (
          <div className="success-popup-overlay" onClick={closeSuccessPopup}>
            <div className="success-popup">
              <svg
                className="success-popup-close"
                onClick={(event) => {
                  event.stopPropagation();
                  closeSuccessPopup();
                }}
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.7433 10.494C19.085 10.1523 19.085 9.59823 18.7433 9.25653C18.4016 8.91482 17.8476 8.91482 17.5059 9.25653L13.9998 12.7626L10.4937 9.25653C10.152 8.91482 9.598 8.91482 9.25629 9.25653C8.91458 9.59823 8.91458 10.1523 9.25629 10.494L12.7624 14L9.25628 17.5061C8.91457 17.8478 8.91457 18.4018 9.25628 18.7435C9.59799 19.0852 10.152 19.0852 10.4937 18.7435L13.9998 15.2375L17.5059 18.7435C17.8476 19.0853 18.4016 19.0853 18.7433 18.7435C19.085 18.4018 19.085 17.8478 18.7433 17.5061L15.2372 14L18.7433 10.494Z"
                  fill="#595959"
                />
              </svg>
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.2757 0.905834C24.0821 -0.301944 35.252 -0.301944 46.0584 0.905834C50.1157 1.35929 53.6773 3.55336 55.9303 6.73973L27.9171 34.7529L19.2733 26.1091C18.2481 25.0839 16.5861 25.0839 15.561 26.1091C14.5358 27.1342 14.5358 28.7962 15.561 29.8214L26.061 40.3214C27.0861 41.3465 28.7481 41.3465 29.7733 40.3214L58.1773 11.9173C58.2559 12.3008 58.3187 12.6902 58.3649 13.0849C59.6572 24.1341 59.6572 35.2963 58.3649 46.3455C57.6129 52.7749 52.4508 57.8101 46.0584 58.5246C35.252 59.7323 24.0821 59.7323 13.2757 58.5246C6.88334 57.8101 1.7212 52.7749 0.96923 46.3455C-0.323077 35.2963 -0.323077 24.1341 0.96923 13.0849C1.7212 6.65552 6.88335 1.62027 13.2757 0.905834Z"
                  fill="#C6F4C6"
                />
              </svg>
              <p className="success-popup-title">Изменения сохранены!</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
