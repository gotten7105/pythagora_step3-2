"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import fetchGuest from "./fetchGuest";
import fetchEventlog from "./fetchEventlog";
import OneGuestInfoCard from "../../components/one_Guest_info_card.jsx";
import OneEventlogInfoCard from "../../components/one_Eventlog_info_card.jsx";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'

export default function Guestpage() {
    const guest_email = useSearchParams().get("guest_email");
    console.log(guest_email);
    const [guest, setGuest] = useState('');

    const [eventLogs, setEventlogs] = useState([]); // 初期値を空の配列に変更

    useEffect(() => {
        const fetchAndSetGuest = async () => {
        const guestData = await fetchGuest(guest_email);
        setGuest(guestData);
        console.log(guestData);

        const eventlogData = await fetchEventlog(guest_email);
        setEventlogs(eventlogData);
        console.log(eventlogData);
        };

        fetchAndSetGuest();

    }, []);
    

    return (
        <>
            <div className="container md:w-3/5 mx-auto px-10 pt-5 pb-2">
            <h1 className="text-2xl font-bold text-blue">
            ユーザー検索
            </h1>
            <div className='pt-5'>
                <Label htmlFor="guest">ゲストメールアドレス</Label>
                <div className='grid grid-cols-3 py-2'>
                    <Input className="col-span-2" id="guest" name="guest" placeholder={guest_email} required type="email" />
                    <Button className="w-2/3 mx-auto" type="submit">検索</Button>
                </div>
            </div>
            <OneGuestInfoCard {...guest} />
            </div>
            <div className="container md:w-3/5 mx-auto px-10 my-5 gap-5">
                <div className='py-5'>
                <h2 className="text-xl font-bold text-blue"> # archive</h2>
                <p className="text-sm">
                {guest_email}さんは {eventLogs.length}件の懇親会にゲストとして登録されています。
                </p>
                </div>
                {eventLogs.map((eventLog, index) => (
                <div key={index}>
                    <OneEventlogInfoCard {...eventLog} />
                </div>
                ))}
            </div>
        </>
    )
}

