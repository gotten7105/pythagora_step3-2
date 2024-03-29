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
            <div className="bg-[#FEF5EE] p-4 flex justify-center space-x-4">
                <div style={{width:"1059px"}}>
                <OneUserInfoCard {...user} />
                </div>
            </div>
            <div className="bg-[#FEF5EE] p-4 flex justify-center space-x-4">
                <div>
                    <h2 className="text-2xl mb-2">restaurant</h2>            
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {myfavorites.map((myfavorite, index) => (
                        <div key={index} >
                            <OneMyfavoriteInfoCard {...myfavorite} />
                        </div>
                        ))}
                    </div>
                </div>
            </div>            
        </>
    )
}