import { Link } from "@inertiajs/react";
import {
    Dashboard,
    DoorSliding,
    Group,
    Home,
    Logout,
    SupervisedUserCircle,
} from "@mui/icons-material";
import React, { useState } from "react";

export default function Layout({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className=" w-full  bg-blue-500 overflow-x-hidden relative">
            {/* navbar */}
            <div className="left-0 top-0 fixed w-full z-20">
                <div className="flex justify-between px-4 py-2 bg-slate-950 text-white items-center">
                    <h1 className="text-xl font-bold">Smart Sliding Gate</h1>
                    <div className="flex gap-3">
                        <Link
                            href={route("home")}
                            className="text-white hover:bg-slate-800 transition-all duration-300 ease-in-out
                            py-2 px-4  flex flex-col justify-center items-center"
                        >
                            <div>
                                <Home />
                            </div>
                            <p className="text-xs tracking-tighter">Home</p>
                        </Link>
                        <Link
                            href={route("dashboard")}
                            className="text-white hover:bg-slate-800 transition-all duration-300 ease-in-out
                        py-2 px-4  flex flex-col justify-center items-center"
                        >
                            <div>
                                <Dashboard />
                            </div>
                            <p className="text-xs tracking-tighter">
                                Dashboard
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="relative top-16">{children}</div>
            <div
                className={`bottom-0 fixed bg-slate-950 backdrop-blur-sm w-full z-[99] transition-all
                 duration-300 ease-in-out`}
            >
                <div className="flex gap-4 justify-around  items-center">
                    <Link
                        as="button"
                        href={route("profile-saya")}
                        className="text-white hover:bg-slate-800 transition-all duration-300 ease-in-out
                    py-4 px-4 flex flex-col justify-center items-center"
                    >
                        <div>
                            <SupervisedUserCircle />
                        </div>
                        <p className="text-xs tracking-tighter">Profile Saya</p>
                    </Link>
                    <Link
                        href={route("data-pengguna")}
                        className="text-white hover:bg-slate-800 transition-all duration-300 ease-in-out
                    py-2 px-4  flex flex-col justify-center items-center"
                    >
                        <div>
                            <Group />
                        </div>
                        <p className="text-xs tracking-tighter">
                            Data Pengguna
                        </p>
                    </Link>
                    <Link
                        href={route("data-akses-pintu")}
                        className="text-white hover:bg-slate-800 transition-all duration-300 ease-in-out
                    py-2 px-4  flex flex-col justify-center items-center"
                    >
                        <div>
                            <DoorSliding />
                        </div>
                        <p className="text-xs tracking-tighter">
                            Deta Keluar Masuk
                        </p>
                    </Link>

                    <Link
                        href={route("logout")}
                        className="text-white hover:bg-slate-800 transition-all duration-300 ease-in-out
                    py-2 px-4  flex flex-col justify-center items-center"
                    >
                        <div>
                            <Logout />
                        </div>
                        <p className="text-xs tracking-tighter">Logout</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
