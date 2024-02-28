import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="email">Correo:</Label>
          <Input
            label="Correo Electronico"
            type="email"
            name="email"
            placeholder="Ingrese su correo electronico"
            {...register("email", { required: true })}
          />
          <p className="text-red-500">{errors.email?.message}</p>

          <Label htmlFor="password">Contraseña:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            {...register("password", { required: true, minLength: 6 })}
          />
          <p className="text-red-500">{errors.password?.message}</p>

          <Button>Inciar sesión</Button>
        </form>

        <p className="flex gap-x-2 justify-between">
          ¿No tiene una cuenta? <Link to="/register" className="text-sky-500">Registrarse</Link>
        </p>
      </Card>
    </div>
  );
}
