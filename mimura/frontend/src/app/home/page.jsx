"use client"
import OneUserInfoCard from "../components/one_user_info_card.jsx";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import fetchUser from "./fetchUser";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";

export default function Mypage() {
    const mail_address = useSearchParams().get("mail_address");
    console.log(mail_address);
    const [userInfos, setUserInfos] = useState([]);
    console.log(userInfos);

    useEffect(() => {
        const fetchAndSetUser = async () => {
            let userData = await fetchUser(mail_address); // letで宣言
            console.log(userData);
            if (!Array.isArray(userData)) {
                userData = [userData];
            }
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
            {Array.isArray(userInfos) && userInfos.map((userInfo, index) => (
            <div key={index} className="card bordered bg-white border-blue-200 border-2 flex flex-row max-w-sm m-4">
            <OneUserInfoCard {...userInfo} />
            </div>
            ))}
        </div>

        <div key="1" className="flex justify-center space-x-4 p-4">
            <div className="flex items-center space-x-4 bg-white p-4">
            <Avatar>
            <AvatarImage alt="User Avatar" src="/placeholder.svg?height=200&width=200" />
            <AvatarFallback>ピ</AvatarFallback>
            </Avatar>

            <div>
            <div className="text-lg font-semibold">user_name</div>
            <div className="text-md text-gray-600">company</div>
            <div className="text-md text-gray-600">working_area</div>
            </div>
            </div>

            <div key="1" className="flex justify-center space-x-4 p-4">
                <div>
                <Card className="mx-auto max-w-md bg-blue">
                    <CardHeader className="space-y-2 items-center">
                        <CardTitle className="text-3xl font-bold text-white">2</CardTitle>
                        <CardDescription className="text-white">企画中</CardDescription>
                    </CardHeader>
                </Card>
                </div>

                <div>
                <Card className="mx-auto max-w-md bg-blue">
                    <CardHeader className="space-y-2 items-center">
                        <CardTitle className="text-3xl font-bold text-white">18</CardTitle>
                        <CardDescription className="text-white">企画済</CardDescription>
                    </CardHeader>
                </Card>
                </div>

                <div>
                <Card className="mx-auto max-w-md bg-blue">
                    <CardHeader className="space-y-2 items-center">
                        <CardTitle className="text-3xl font-bold text-white">25</CardTitle>
                        <CardDescription className="text-white">参加済</CardDescription>
                    </CardHeader>
                </Card>
                </div>
            </div>
        </div>

        {/* <div className="flex justify-center space-x-4 p-4"> */}
            <div className="flex justify-center space-x-4 p-4 pt-10">
            <PlusIcon className="h-7 w-7" />
            <span className="text-lg font-bold text-blue">my favorite</span>
            </div>
            <hr style={{ width: '50%', margin: '0 auto',  borderWidth: '2px' }}/>
            <div className="flex justify-center space-x-4 p-4">
            <div className="text-lg font-bold text-blue justify-start">category</div>
            <div>
            <div className="text-md text-gray-600">#user_category1</div>
            <div className="text-md text-gray-600">#user_category2</div>
            <div className="text-md text-gray-600">#user_category3</div>
            </div>
            </div>
            <div className="flex justify-center space-x-4 p-4">
            <div className="text-lg font-bold text-blue justify-start">restaurant</div>
            <div>
            <div className="text-md text-gray-600">#user_category1</div>
            <div className="text-md text-gray-600">#user_category2</div>
            <div className="text-md text-gray-600">#user_category3</div>
            </div>
            </div>
        {/* </div> */}
        
        </>
    );
}

function PlusIcon(props) {
    return (
     (<svg
        {...props}
        width="43" 
        height="28" 
        viewBox="0 0 43 28" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <path d="M18.4346 3.09024C18.4346 3.93686 18.7355 4.66355 19.3374 5.2703C19.9393 5.87704 20.6602 6.18042 21.5 6.18042C22.3398 6.18042 23.0607 5.87704 23.6626 5.2703C24.2645 4.66355 24.5654 3.93686 24.5654 3.09024C24.5654 2.24361 24.2645 1.51693 23.6626 0.910181C23.0607 0.303432 22.3398 5.91278e-05 21.5 5.91278e-05C20.6602 5.91278e-05 19.9393 0.303432 19.3374 0.910181C18.7355 1.51693 18.4346 2.24361 18.4346 3.09024ZM36.8691 6.18042C36.8691 7.02704 37.1701 7.75373 37.772 8.36048C38.3739 8.96722 39.0947 9.2706 39.9346 9.2706C40.7744 9.2706 41.4953 8.96722 42.0972 8.36048C42.6991 7.75373 43 7.02704 43 6.18042C43 5.33379 42.6991 4.60711 42.0972 4.00036C41.4953 3.39361 40.7744 3.09024 39.9346 3.09024C39.0947 3.09024 38.3739 3.39361 37.772 4.00036C37.1701 4.60711 36.8691 5.33379 36.8691 6.18042ZM0 6.18042C0 7.02704 0.300944 7.75373 0.902832 8.36048C1.50472 8.96722 2.22559 9.2706 3.06543 9.2706C3.90527 9.2706 4.62614 8.96722 5.22803 8.36048C5.82992 7.75373 6.13086 7.02704 6.13086 6.18042C6.13086 5.33379 5.82992 4.60711 5.22803 4.00036C4.62614 3.39361 3.90527 3.09024 3.06543 3.09024C2.22559 3.09024 1.50472 3.39361 0.902832 4.00036C0.300944 4.60711 0 5.33379 0 6.18042ZM6.13086 9.2706L9.19629 27.854H33.8037L36.8691 9.2706L29.1846 17.4405L21.5 9.39759L13.9414 17.4405L6.13086 9.2706Z" fill="#1521A4"/>
    </svg>
    )
    );
  }