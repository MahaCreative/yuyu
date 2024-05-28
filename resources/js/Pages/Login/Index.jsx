import { useForm } from "@inertiajs/react";
import React from "react";

export default function Index() {
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
        remember: "",
    });
    const loginHandler = (e) => {
        e.preventDefault();
        post(route("login"));
    };
    return (
        <div className="w-full min-h-screen bg-blue-600 flex justify-center items-center">
            <div className="px-8 text-center">
                <h3 className="text-white font-bold text-2xl tracking-tighter">
                    Selamat Datang Di Aplikasi Smart Sliding Gate
                </h3>
                <p className="tracking-tighter">
                    Silahkan Login untuk bisa menggunakan Smart Sliding Gate
                    Kami.
                </p>
                <div className="my-6 bg-white rounded-md py-2 px-3">
                    <h3 className="font-bold text-2xl tracking-tighter text-blue-500">
                        Login
                    </h3>
                    <form action="" onSubmit={loginHandler}>
                        <div className="flex flex-col gap-2 justify-start items-start">
                            <p>Email</p>
                            <input
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full  rounded-md border-blue-500"
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500 italic">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 justify-start items-start">
                            <p>Password</p>
                            <input
                                type="password"
                                name="password"
                                className="w-full rounded-md border-blue-500"
                                value={data.password}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                name="remember"
                                type="checkbox"
                                id="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        remember: e.target.checked,
                                    })
                                }
                            />
                            <label htmlFor="remember" className="ml-2">
                                Remember Me
                            </label>
                        </div>
                        <div className="flex justify-start">
                            <button className="my-3 bg-blue-500 text-white rounded-md px-4 py-2">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
