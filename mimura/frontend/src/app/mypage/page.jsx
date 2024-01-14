"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import fetchUser from "./fetchUser";
import fetchMyfavorite from "./fetchMyfavorite";
import OneUserInfoCard from "../components/one_user_info_card.jsx";
import OneMyfavoriteInfoCard from "../components/one_myfavorite_info_card.jsx";

export default function Mypage() {
    const router = useRouter();
    const mail_address = useSearchParams().get("mail_address");
    console.log(mail_address);
    const [user, setUser] = useState([]); // 初期値を空の配列に変更
    const [myfavorites, setMyfavorites] = useState([]); // 初期値を空の配列に変更

    useEffect(() => {
        const fetchAndSetUser = async () => {
        const userData = await fetchUser(mail_address);
        console.log(userData);
        setUser(userData);
        const myfavoriteData = await fetchMyfavorite(mail_address);
        console.log(myfavoriteData);
        setMyfavorites(myfavoriteData);



        };

        fetchAndSetUser();
    }, []);

    return (
        <>
            <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
                <div className="btn btn-primary m-4 text-2xl">
                <button onClick={() => router.push(`/mypage/task?mail_address=${mail_address}`)}>
                    懇親会作成
                </button>
                </div>
                {/* <OneUserInfoCard {...user} /> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myfavorites.map((myfavorite, index) => (
                <div key={index} className="card bordered bg-white border-blue-200 border-2 flex flex-row max-w-sm m-4">
                    <OneMyfavoriteInfoCard {...myfavorite} />
                </div>
                ))}
            </div>
        </>
    )
}