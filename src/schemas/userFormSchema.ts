import z from "zod";

export const userFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Имя должно быть не менее 2 символов")
    .max(64, "Имя должно быть не более 64 символов"),
  username: z
    .string()
    .trim()
    .min(2, "Никнейм должен быть не менее 2 символов")
    .max(64, "Никнейм должен быть не более 64 символов"),
  email: z.email("Некорректный формат почты"),
  city: z
    .string()
    .trim()
    .min(2, "Город должен быть не менее 2 символов")
    .max(64, "Город должен быть не более 64 символов"),
  phone: z
    .string()
    .trim()
    .regex(/^\d+$/, "Телефон должен содержать только цифры"),
  companyName: z
    .string()
    .trim()
    .min(2, "Название компании должно быть не менее 2 символов")
    .max(64, "Название компании должно быть не более 64 символов"),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
