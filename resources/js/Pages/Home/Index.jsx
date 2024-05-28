import { Link, router } from "@inertiajs/react";
import React from "react";

export default function Index(props) {
    const users = props.users;
    const pilihMenu = (menu) => {
        router.post("pilih-menu", {
            user: users.user,
            menu: menu,
        });
    };
    return (
        <div className="w-full h-screen bg-blue-500 flex justify-center items-center flex-col">
            <div className="w-full px-4">
                <div className="w-full flex flex-col text-center">
                    <h3 className="capitalize text-white font-bold text-3xl">
                        Hy, {users.user.name}
                    </h3>
                    <p className="font-light tracking-tighter text-white">
                        Selamat Datang di Aplikasi Smart Sliding Gate Kami,
                        silahkan memilih menu dibawah untuk mengontrol pintu
                        gerbang otomatis
                    </p>
                </div>
            </div>
            <div className="w-full flex justify-center items-center my-3">
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => pilihMenu("keluar")}
                        className="bg-white py-2 px-4 text-blue-500 font-medium text-2xl "
                    >
                        Keluar
                    </button>
                    <button
                        onClick={() => pilihMenu("masuk")}
                        className="bg-white py-2 px-4 text-blue-500 font-medium text-2xl "
                    >
                        Masuk
                    </button>
                    <Link
                        as="button"
                        href={route("logout")}
                        className="bg-white py-2 px-4 text-blue-500 font-medium text-2xl "
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
}
