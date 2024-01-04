"use client";

import styles from './styles.module.css';
import OneUserInfoCard from "../components/one_user_info_card.jsx";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import fetchUser from "./fetchUser";


export default function Mypage() {
  const mail_address = useSearchParams().get("mail_address");
    console.log(mail_address);
  const [userInfos, setUserInfos] = useState([]);
  console.log(userInfos);

  useEffect(() => {
      const fetchAndSetUser = async () => {
          const userData = await fetchUser(mail_address);
          console.log(userData); // 配列であることを確認
          setUserInfos(userData);
      };
      fetchAndSetUser();
  }, []);

  return (
    <>
      <div className="p-4">
        <Link href="/mypage/task" className="mt-4 pt-4" prefetch={false}>
          <button className="btn btn-neutral w-full border-0 bg-blue-200 text-black hover:text-white">+ 懇親会作成</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userInfos.map((userInfo, index) => (
          <div key={index} className="card bordered bg-white border-blue-200 border-2 flex flex-row max-w-sm m-4">
            <OneUserInfoCard {...userInfo} />
          </div>
        ))}
      </div>
    </>
  );
}