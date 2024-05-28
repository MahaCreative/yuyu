import React, { useEffect, useState } from "react";
import Layout from "../Layouts/Layout";
import axios from "axios";
import moment from "moment";
import { AccountCircle, Input } from "@mui/icons-material";

export default function Index(props) {
    const [dataKeluarMasuk, setDataKeluarMasuk] = useState(null);
    const count = props.count;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("data-keluar-masuk"); // Ganti URL_API_ANDA dengan URL endpoint API Anda
                setDataKeluarMasuk(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 1000); // Memanggil fetchData setiap 5 detik
        return () => clearInterval(interval); // Membersihkan interval saat komponen dibongkar
    }, []);
    return (
        <div className="h-screen px-4">
            <div className="my-3 grid grid-cols-2 gap-3">
                <div className=" py-2 px-3 rounded-md bg-gradient-to-tl from-orange-800 via-orange-700 to-orange-500 flex justify-between items-center">
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
                <div className=" py-2 px-3 rounded-md bg-gradient-to-tl from-red-800 via-red-700 to-red-500 flex justify-between items-center">
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
                <div className="col-span-2 py-2 px-3 rounded-md bg-gradient-to-tl from-green-800 via-green-700 to-green-500 flex justify-between items-center">
                    <div className="text-white font-bold text-2xl">
                        <AccountCircle color="inherit" fontSize="inherit" />
                    </div>
                    <div className="w-full text-right">
                        <div className="text-white font-bold text-2xl">
                            {count.jumlah_user}
                        </div>
                        <p className="text-xs font-light text-white">
                            Jumlah Pengguna Terdaftar
                        </p>
                    </div>
                </div>
            </div>
            <div className="my-3">
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
        </div>
    );
}

Index.layout = (page) => <Layout children={page} />;
