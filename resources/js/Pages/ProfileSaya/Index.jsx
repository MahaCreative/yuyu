import React from "react";
import Layout from "../Layouts/Layout";
import { useForm } from "@inertiajs/react";

export default function Index(props) {
    const profile = props.profile;
    const { data, setData, post, reset, errors } = useForm({
        name: profile.name,
        email: profile.email,
        password: profile.password,
        kode_ktp: profile.kode.kode_ktp,
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post("update-profile-saya");
    };
    return (
        <div className="py-3 w-full min-h-screen px-4">
            <div className="py-2">
                <h3 className="text-white font-bold capitalize">
                    Hy, {profile.name}
                </h3>
                <p className="text-xs text-white font-bold">
                    Jika ingin mengatur ulang profile anda, silahkan isi form
                    dibawah ini
                </p>
            </div>
            <div className="bg-white py-3 my-3 px-4 rounded-md">
                <form onSubmit={submitHandler}>
                    <div className="flex flex-col gap-1 justify-start items-start">
                        <p>Nama</p>
                        <input
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            name="name"
                            value={data.name}
                            className="w-full  rounded-md border-blue-500"
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500 italic">
                                {errors.name}
                            </p>
                        )}
                    </div>
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
                        <p className="mt-2 text-xs font-bold">
                            * Biarkan kosong jika tidak ingin mengganti password
                        </p>
                        <p>Password</p>
                        <input
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            type="password"
                            name="password"
                            className="w-full  rounded-md border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2 justify-start items-start">
                        <p className="mt-2 text-xs font-bold">
                            Jika Kode Akses KTP diganti tanpa melakukan scan
                            maka ktp anda tidak akan membuka gerbang.
                        </p>
                        <p>Kode Akses KTP</p>
                        <input
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            name="kode_ktp"
                            value={data.kode_ktp}
                            className="w-full  rounded-md border-blue-500"
                        />
                        {errors.kode_ktp && (
                            <p className="text-xs text-red-500 italic">
                                {errors.kode_ktp}
                            </p>
                        )}
                    </div>
                    <button className="py-2 px-4 bg-blue-500 text-white my-3">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

Index.layout = (page) => <Layout children={page} />;
