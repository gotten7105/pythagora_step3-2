import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import React, { useState, useEffect } from 'react';

export default function OneUserInfoCard({
  user_name,
  company,
  working_area,
  user_category1,
  user_category2,
  user_category3,
}) {

  // const [randomNumber, setRandomNumber] = useState(null);
  // useEffect(() => {
  //   // クライアントサイドでのみランダムな数値を生成
  //   setRandomNumber(Math.floor(Math.random() * (30 - 5 + 1)) + 5);
  // }, []);

  return (
    <>
    <div className="bg-[#FEF5EE] p-4 flex justify-center space-x-4">
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-10">

    <div className="flex justify-center items-center space-x-7 bg-white p-7">
      <Avatar>
      <AvatarImage alt="User Avatar" src="avatar.png" />
      <AvatarFallback>ピ</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-2xl font-semibold">{user_name}</div>
        <div className="text-lg text-gray-600">{company}</div>
        <div className="text-lg text-gray-600">{working_area}</div>
      </div>
    </div>

    <div className="flex justify-center space-x-4 p-4">
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
                        <CardTitle className="text-3xl font-bold text-white">3</CardTitle>
                        <CardDescription className="text-white">企画済</CardDescription>
                    </CardHeader>
                </Card>
                </div>

                <div>
                <Card className="mx-auto max-w-md bg-blue">
                    <CardHeader className="space-y-2 items-center">
                        <CardTitle className="text-3xl font-bold text-white">25</CardTitle>
                        {/* <CardTitle className="text-3xl font-bold text-white">{randomNumber !== null ? randomNumber : 'Loading...'}</CardTitle> */}
                        <CardDescription className="text-white">参加済</CardDescription>
                    </CardHeader>
                </Card>
                </div>
    </div>
    </div>
    </div>

      <div className="md:container md:-mx-30 pt-5 pb-2">
        <div className="text-black">
            <div className="flex justify-center space-x-4 p-2">
            <CrownIcon className="h-7 w-7" />
            <h1 className="text-2xl font-bold mb-4 text-blue">my favorite</h1>
            </div>

            <hr style={{ margin: '0 auto',  borderWidth: '2px' }}/>
            
            <h2 className="text-2xl mb-2">category</h2>
                <div className="flex gap-2 mb-8">
                <Badge variant="secondary">#{user_category1}</Badge>
                <Badge variant="secondary">#{user_category2}</Badge>
                <Badge variant="secondary">#{user_category3}</Badge>
                </div>
        </div>
      </div>

    </>
  );
}

function CrownIcon(props) {
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