import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

const Login = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit
  } = useForm();

  const onSubmit = async (data: any) => {

    try {

      const response = await api.post(
        "/auth/login",
        data
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-80"
      >

        <input
          {...register("email")}
          placeholder="Email"
          className="border p-2"
        />

        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          className="border p-2"
        />

        <button
          className="bg-black text-white p-2"
        >
          Login
        </button>

      </form>

    </div>

  );

};

export default Login;