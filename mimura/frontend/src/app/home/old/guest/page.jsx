"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import fetchGuest from "./fetchGuest";
import fetchEventlog from "./fetchEventlog";
import OneGuestInfoCard from "../../components/one_Guest_info_card.jsx";
import OneEventlogInfoCard from "../../components/one_Eventlog_info_card.jsx";

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
            <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
                <OneGuestInfoCard {...guest} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eventLogs.map((eventLog, index) => (
                <div key={index} className="card bordered bg-white border-blue-200 border-2 flex flex-row max-w-sm m-4">
                    <OneEventlogInfoCard {...eventLog} />
                </div>
                ))}
            </div>
        </>
    )
}