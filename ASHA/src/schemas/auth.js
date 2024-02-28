import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Ingresa una dirección de correo electronico valida",
  }),
  password: z.string().min(6, {
    message: "Ingresa una contraseña minimo de 6 caracteres",
  }),
});

export const registerSchema = z
  .object({
    username: z
      .string({
        required_error: "El nombre de usuario es obligatorio",
      })
      .min(4, {
        message: "El nombre de usuario debe ser al menos 4 caracteres",
      }),
    email: z.string().email({
      message: "Ingresa un correo electronico valido",
    }),
    password: z.string().min(6, {
      message: "Ingresa una contraseña minimo de 6 caracteres",
    }),
    confirmPassword: z.string().min(6, {
      message: "Ingresa una contraseña minimo de 6 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contrasenias no coinciden",
    path: ["confirmPassword"],
  });
