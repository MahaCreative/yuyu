import { router } from "@inertiajs/react";
import { Cancel, Input } from "@mui/icons-material";
import { debounce } from "@mui/material";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../Layouts/Layout";

export default function Index(props) {
    const dataKeluarMasuk = props.dataKeluarMasuk;
    const count = props.count;
    const [params, setParams] = useState({
        cari: "",
        jenis: "",
        dari_tanggal: "",
        sampai_tanggal: "",
        dari_jam: "",
        sampai_jam: "",
    });

    const reload = useCallback(
        debounce((query) => {
            router.get(route("data-akses-pintu"), query, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <div className="py-3 w-full min-h-screen px-4 my-3">
            <div className="my-3 grid grid-cols-2 gap-3">
                <div
                    onClick={() => setParams({ ...params, jenis: "masuk" })}
                    className=" py-2 px-3 rounded-md bg-gradient-to-tl from-orange-800 via-orange-700 to-orange-500 flex justify-between items-center"
                >
                    <div className="text-white font-bold text-2xl">
                        <Input color="inherit" fontSize="inherit" />
                    </div>
                    <div className="w-full text-right">
                        <div className="text-white font-bold text-2xl">
                            {count.jumlah_masuk}
                        </div>
                        <p className="text-xs font-light text-white">
                            Jumlah Orang Yang Masuk
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => setParams({ ...params, jenis: "keluar" })}
                    className=" py-2 px-3 rounded-md bg-gradient-to-tl from-red-800 via-red-700 to-red-500 flex justify-between items-center"
                >
                    <div className="text-white font-bold text-2xl">
                        <Input color="inherit" fontSize="inherit" />
                    </div>
                    <div className="w-full text-right">
                        <div className="text-white font-bold text-2xl">
                            {count.jumlah_keluar}
                        </div>
                        <p className="text-xs font-light text-white">
                            Jumlah Orang Yang Keluar
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center my-3">
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
                <input
                    onChange={(e) =>
                        setParams({
                            ...params,
                            dari_tanggal: e.target.value,
                        })
                    }
                    type="date"
                    placeholder="Cari Pengguna"
                    name="dari_tanggal"
                    value={params.dari_tanggal}
                    className="  rounded-md border-blue-500 w-1/3"
                />
                <input
                    onChange={(e) =>
                        setParams({
                            ...params,
                            sampai_tanggal: e.target.value,
                        })
                    }
                    type="date"
                    placeholder="Cari Pengguna"
                    name="sampai_tanggal"
                    value={params.sampai_tanggal}
                    className="  rounded-md border-blue-500 w-1/3"
                />
            </div>
            <div className="flex gap-3 items-center my-3">
                <input
                    onChange={(e) =>
                        setParams({
                            ...params,
                            dari_jam: e.target.value,
                        })
                    }
                    type="time"
                    placeholder="Cari Pengguna"
                    name="dari_jam"
                    value={params.dari_jam}
                    className="  rounded-md border-blue-500 w-1/3"
                />
                <input
                    onChange={(e) =>
                        setParams({
                            ...params,
                            sampai_jam: e.target.value,
                        })
                    }
                    type="time"
                    placeholder="Cari Pengguna"
                    name="sampai_jam"
                    value={params.sampai_jam}
                    className="  rounded-md border-blue-500 w-1/3"
                />
                <button
                    onClick={() =>
                        setParams({
                            ...params,
                            cari: "",
                            jenis: "",
                            dari_tanggal: "",
                            sampai_tanggal: "",
                            dari_jam: "",
                            sampai_jam: "",
                        })
                    }
                    className="bg-orange-500 text-white py-2 px-4"
                >
                    <Cancel />
                </button>
            </div>
            {dataKeluarMasuk ? (
                dataKeluarMasuk.map((item, key) => (
                    <div
                        key={key}
                        className="py-2 px-3 rounded-md bg-white my-3"
                    >
                        <div className="flex justify-between">
                            <div>
                                <h3
                                    className={`${
                                        item.jenis == "masuk"
                                            ? "text-green-500"
                                            : "text-red-500"
                                    } capitalize font-bold text-xl tracking-tighter`}
                                >
                                    {item.jenis}
                                </h3>
                                <p className="font-light tracking-tighter">
                                    {item.nama}
                                </p>
                            </div>
                            <div className="text-right">
                                <h3
                                    className={`${
                                        item.jenis == "masuk"
                                            ? "text-green-500"
                                            : "text-red-500"
                                    } capitalize font-bold text-xl tracking-tighter`}
                                >
                                    {item.jam}
                                </h3>
                                <p className="font-light tracking-tighter">
                                    {moment(item.tanggal).format(
                                        "DD-MMMM-YYYY"
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="h-full w-full flex justify-center items-center">
                    <h3
                        className="text-white font-bold text-3xl text-center tracking-tighter
                    "
                    >
                        Belum Ada Data Orang Yang Keluar Masuk
                    </h3>
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => <Layout children={page} />;
