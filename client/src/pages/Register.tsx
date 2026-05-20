import {
  useForm
} from "react-hook-form";

import {
  useNavigate
} from "react-router-dom";

import api from "../api/axios";

const Register = () => {

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

      await api.post(
        "/auth/register",
        data
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

    }

  };




  return (

    <div className="h-screen flex items-center justify-center bg-gray-100">

      <form

        onSubmit={handleSubmit(onSubmit)}

        className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col gap-4"

      >

        <h1 className="text-3xl font-bold text-center">

          Register

        </h1>




        <input

          {...register("name")}

          placeholder="Name"

          className="border p-3 rounded"

        />




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

          Register

        </button>

      </form>

    </div>

  );

};

export default Register;