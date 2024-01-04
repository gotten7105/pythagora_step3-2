"use client";

import styles from './styles.module.css';
import OneUserInfoCard from "../components/one_user_info_card.jsx";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Mypage() {
  const mail_address = useSearchParams().get("mail_address");
  console.log(mail_address);

  // Flaskから取得したデータを格納
  const [userInfos, setUserInfos] = useState([
    {
      company: "ピタゴラ不動産",
      user_category1: "居酒屋",
      user_category2: "焼肉",
      user_category3: "焼き鳥",
      user_class: "課長",
      user_name: "中村剛",
      working_area: "大阪",
    },
]);

  useEffect(() => {
    // 非同期処理は不要なので削除
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
            <OneUserInfoCard
              company={userInfo[0]}
              user_category1={userInfo[1]}
              user_category2={userInfo[2]}
              user_category3={userInfo[3]}
              user_class={userInfo[4]}
              user_name={userInfo[5]}
              working_area={userInfo[6]}
            />
          </div>
        ))}
      </div>
    </>
  );
}
