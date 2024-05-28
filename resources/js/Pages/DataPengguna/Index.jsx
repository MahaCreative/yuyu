import React, { useCallback, useEffect, useState } from "react";
import Layout from "../Layouts/Layout";
import moment from "moment";
import { Delete, Edit } from "@mui/icons-material";
import { router } from "@inertiajs/react";
import { Modal, debounce } from "@mui/material";
import Form from "./Form";

export default function Index(props) {
    const [params, setParams] = useState({
        cari: "",
    });
    const user = props.user;
    const [modal, setModal] = useState(false);
    const [model, setModel] = useState(null);
    const editHandler = (row) => {
        setModel(row);
        setModal(true);
    };
    const deleteHandler = (row) => {
        router.delete(route("delete-data-pengguna", { id: row.id }), {
            preserveScroll: true,
        });
    };
    const reload = useCallback(
        debounce((query) => {
            router.get(route("data-pengguna"), query, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <div className="py-3 w-full min-h-screen px-4 my-3">
            <Modal open={modal} onClose={setModal}>
                <div className="w-full h-full flex  justify-center items-center ">
                    <div className="min-w-[80vw] bg-white py-2 px-4">
                        <Form
                            model={model}
                            setModel={setModel}
                            onClose={setModal}
                        />
                    </div>
                </div>
            </Modal>
            <h3 className="text-white font-bold text-xl tracking-tighter">
                Data Pengguna Terdaftar
            </h3>
            <p className="text-xs font-light text-white w-[80%]">
                Pengguna terdaftar merupakan pengguna yang dapat mengakses pintu
                otomatis menggunakan smartphonenya
            </p>
            <div className="flex justify-between items-center my-3">
                <button
                    onClick={() => {
                        setModal(true);
                        setModel(null);
                    }}
                    className="py-2 px-2 text-blue-500 font-bold bg-white"
                >
                    Tambah Pengguna
                </button>
                <input
                    onChange={(e) =>
                        setParams({
                            ...params,
                            cari: e.target.value,
                        })
                    }
                    placeholder="Cari Pengguna"
                    name="Cari"
                    value={params.cari}
                    className="  rounded-md border-blue-500 w-1/3"
                />
            </div>
            <div className="my-3">
                {user.length > 0 ? (
                    user.map((item, key) => (
                        <div className="my-2 bg-white rounded-md px-3 py-2">
                            <h3 className="text-blue-500 font-bold">
                                {item.name}
                            </h3>
                            <p className="tracking-tighter text-xs">
                                Terdaftar Sejak{" "}
                                {moment(item.created_at)
                                    .subtract(1, "hours")
                                    .fromNow()}
                            </p>
                            <h3 className="text-blue-500 font-bold">
                                {item.email}
                            </h3>
                            <p className="tracking-tighter text-xs">
                                Kode Akses KTP {item.kode.kode_ktp}
                            </p>
                            <div className="flex justify-end">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => deleteHandler(item)}
                                        className="bg-red-500 py-1 px-2 text-white text-xs"
                                    >
                                        <Delete fontSize="medium" />
                                    </button>
                                    <button
                                        onClick={() => editHandler(item)}
                                        className="bg-orange-500 py-1 px-2 text-white text-xs"
                                    >
                                        <Edit fontSize="medium" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-full w-full flex justify-center items-center">
                        <div className="text-center">
                            <h3
                                className="text-white font-bold text-3xl text-center tracking-tighter
                                                "
                            >
                                Belum Ada Data Pengguna yang Telah di Daftarkan
                            </h3>
                            <p className="text-white">
                                Silahkan daftarkan pengguna dengan menekan
                                tombol dibawah ini.
                            </p>
                            <button
                                onClick={() => {
                                    setModal(true);
                                    setModel(null);
                                }}
                                className="py-2 px-4 bg-white text-blue-500 font-bold my-4"
                            >
                                Daftarkan Pengguna Baru
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

Index.layout = (page) => <Layout children={page} />;
