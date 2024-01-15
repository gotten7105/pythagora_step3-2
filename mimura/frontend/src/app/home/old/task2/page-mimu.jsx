"use client";
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import fetchEvent from './fetchEvent';
import OneEvent2InfoCard from '../../components/one_event2_info_card.jsx';

export default function Myparty2() {
    const router = useRouter();
    const event_id = useSearchParams().get('event_id'); // パラメータ名をクォーテーションで囲む
    console.log(event_id);
    const [event, setEvent] = useState([]);
    const [event_date, setEventDate] = useState('');
    const [event_time, setEventTime] = useState('');

    useEffect(() => {
        const fetchAndSetEvent = async () => {
        const eventData = await fetchEvent(event_id);
        console.log(eventData);
        setEvent(eventData);
        };

        fetchAndSetEvent();
    }, []);

    const handleEventDateChange = async (event) => {
        setEventDate(event.target.value);
    };

    const handleEventTimeChange = async (event) => {
        setEventTime(event.target.value);

        if (event_date.length >= 5 && event_time.length >= 3) {
            const body_msg = JSON.stringify({
                event_date: event_date,
                event_time: event_time,
                event_id: event_id,
            });
            console.log(body_msg);
            const response = await fetch('http://127.0.0.1:5000/daytime', {
                method: 'POST',
                body: body_msg,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('送信成功');
                const jsonData = await response.json();
                console.log(jsonData);
                router.push(`/mypage/task3?event_id=${event_id}`);
            }
        }
    };

    return (
            <OneEvent2InfoCard {...event} />
    );
};