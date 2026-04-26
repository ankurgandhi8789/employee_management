import React, { useState } from "react";

const Login = ({handleLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(handleLogin)

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email,password);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="border-2 rounded-xl border-emerald-600 p-20 ">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col items-center justify-center"
        >
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
            className="text-gray-300 placeholder:text-gray-400  outline-none border-2 border-emerald-600 text-xl py-3 px-5 bg-transparent rounded-full"
            type="email"
            placeholder="email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
            type="password"
            className="text-gray-300 placeholder:text-gray-400 outline-none border-2 mt-3 border-emerald-600 text-xl py-3 px-5 bg-transparent rounded-full"
            placeholder="password"
          />
          <button className="text-white mt-5  outline-none  bg-emerald-600 text-xl py-3 px-5  rounded-full w-full">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
