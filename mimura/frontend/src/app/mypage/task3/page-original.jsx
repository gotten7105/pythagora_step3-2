"use client";
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import fetchEvent from './fetchEvent';
import OneEvent3InfoCard from '../../components/one_event3_info_card.jsx';

export default function Myparty3() {
    const router = useRouter();
    const event_id = useSearchParams().get('event_id');
    console.log(event_id);
    const [event, setEvent] = useState([]);
    const [guest_email, setGuestEmail] = useState('');
    const [restaurant_id, setRestaurantId] = useState('');

    useEffect(() => {
        const fetchAndSetEvent = async () => {
        const eventData = await fetchEvent(event_id);
        const guest_email = eventData.guest_email;
        console.log(guest_email);
        setGuestEmail(guest_email);
        console.log(eventData);
        setEvent(eventData);
        };

        fetchAndSetEvent();
    }, []);

    const handleRestaurantChange = (event) => {
        setRestaurantId(event.target.value);
        router.push(`/mypage/task4?event_id=${event_id}&restaurant_id=${restaurant_id}`);
    };

    const handleGuestChange = async (event) => {
        setGuestEmail(event.target.value);
        const url = `/mypage/guest?guest_email=${guest_email}`;
        window.open(url, '_blank');
    };

    return (
        <div className={styles.container}>
            <div>
                <label>
                店名:
                    <input
                    name="restaurant_id"
                    type="number"
                    onChange={handleRestaurantChange}
                    />
                </label>
            </div>
            <div>
            <OneEvent3InfoCard {...event} />
            <button onClick={handleGuestChange}>▶ゲストの好きな料理ジャンルやこだわりを探す</button>
            </div>
        </div>
    );
};