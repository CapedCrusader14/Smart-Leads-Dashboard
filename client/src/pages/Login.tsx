import {
  useForm
} from "react-hook-form";

import {
  useNavigate
} from "react-router-dom";

import api from "../api/axios";

const Login = () => {

  const navigate =
    useNavigate();




  const {

    register,

    handleSubmit

  } = useForm();




  const onSubmit = async (
    data: any
  ) => {

    try {

      const response =
        await api.post(
          "/auth/login",
          data
        );




      console.log(response.data);




      localStorage.setItem(

        "token",

        response.data.token

      );




      navigate("/");

    } catch (error: any) {

      console.log(error);




      alert(

        "Login failed"

      );

    }

  };




  return (

    <div className="h-screen flex items-center justify-center bg-gray-100">

      <form

        onSubmit={handleSubmit(onSubmit)}

        className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col gap-4"

      >

        <h1 className="text-3xl font-bold text-center">

          Login

        </h1>


        <input

          {...register("email")}

          placeholder="Email"

          className="border p-3 rounded"

        />




        <input

          {...register("password")}

          placeholder="Password"

          type="password"

          className="border p-3 rounded"

        />




        <button

          className="bg-black text-white p-3 rounded"

        >

          Login

        </button>

      </form>

    </div>

  );

};

export default Login;