import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function Form({ model, setModel, onClose }) {
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        email: "",
        password: "",
        kode_ktp: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post("create-data-pengguna", {
            onSuccess: () => {
                reset();
                onClose(false);
            },
        });
    };
    const updateHandler = (e) => {
        post("update-data-pengguna", {
            onSuccess: () => {
                reset();
                onClose(false);
                setModel(null);
            },
        });
    };
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            name: model ? model.name : "",
            email: model ? model.email : "",
            password: model ? model.password : "",
            kode_ktp: model ? model.kode.kode_ktp : "",
        });
    }, [model]);
    return (
        <div>
            <form onSubmit={model ? updateHandler : submitHandler}>
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
                    {model && (
                        <p className="mt-2 text-xs font-bold">
                            * Biarkan kosong jika tidak ingin mengganti password
                        </p>
                    )}
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
                    {model && (
                        <p className="mt-2 text-xs font-bold">
                            Jika Kode Akses KTP diganti tanpa melakukan scan
                            maka ktp anda tidak akan membuka gerbang.
                        </p>
                    )}
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
                    {model ? "Update" : "Create"}
                </button>
                <button
                    onClick={() => {
                        setModel(null);
                        onClose(false);
                    }}
                    className="py-2 px-4 bg-red-500 text-white my-3"
                >
                    Cancell
                </button>
            </form>
        </div>
    );
}
