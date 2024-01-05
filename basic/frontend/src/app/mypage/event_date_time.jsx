"use client";
import styles from './styles.module.css';
import OneUserInfoCard from "../components/one_user_info_card.jsx";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import fetchUser from "./fetchUser";

export default function Mypage() {
    const router = useRouter();
    const mail_address = useSearchParams().get("mail_address");
    console.log(mail_address);
    const [user, setUser] = useState([]); // 初期値を空の配列に変更
    function check() {
        if value1 !="" && value2 != ""{
            fetch でbody使ってjsonデータに変換してflaskになげる
        }
    }

    useEffect(() => {
        const fetchAndSetUser = async () => {
        const userData = await fetchUser(mail_address);
        console.log(userData);
        setUser(userData);
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
                <OneUserInfoCard {...user} />
            </div>
        </>
    )
}