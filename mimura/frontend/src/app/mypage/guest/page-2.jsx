"use client";
import styles from './styles.module.css';
import OneUserInfoCard from "../components/one_user_info_card.jsx";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import fetchGuest from "./fetchGuest";
import fetchEventlog from "./fetchEventlog";

export default function Guestpage() {
    const guest_email = useSearchParams().get("guest_email");
    console.log(guest_email);
    const [guest_category1, setGuestCategory1] = useState('');
    const [guest_category2, setGuestCategory2] = useState('');
    const [guest_category3, setGuestCategory3] = useState('');
    const [guest_memo, setGuestMemo] = useState('');
    const [guest, setGuest] = useState('');

    const [event_name, setEventName] = useState('');
    const [restaurant_evaluation_ave, setRestaurantEvaluationAve] = useState('');
    const [event_evaluation_ave, setEventEvaluationAve] = useState('');
    const [event_date, setEventDate] = useState('');
    const [average_charge, setAverageCharge] = useState('');
    const [user_name, setUserName] = useState('');
    const [attendees, setAttendees] = useState('');
    const [total_restaurant_comment, setTotalRestaurantComment] = useState('');

    const [total_event_comment, setTotalEventComment] = useState('');
    const [restaurant_name, setRestaurantName] = useState('');
    const [genre, setGenre] = useState('');
    const [restaurant_address, setRestaurantAddress] = useState('');
    const [restaurant_image, setRestaurantImage] = useState('');
    const [restaurant_public_evaluation, setRestaurantPublicEvaluation] = useState('');
    const [eventlog, setEventlog] = useState([]); // 初期値を空の配列に変更

    useEffect(() => {
        const fetchAndSetGuest = async () => {
        const guestData = await fetchGuest(guest_email);
        const guest_category1 = guestData.guest_category1;
        const guest_category2 = guestData.guest_category2;
        const guest_category3 = guestData.guest_category3;
        setGuestCategory1(guest_category1);
        setGuestCategory2(guest_category2);
        setGuestCategory3(guest_category3);
        setGuestMemo(guest_memo);
        setGuest(guestData);
        console.log(guestData);

        const eventlogData = await fetchEventlog(guest_email);
        const event_name = eventlogData.event_name;
        const restaurant_evaluation_ave = eventlogData.restaurant_evaluation_ave;
        const event_evaluation_ave = eventlogData.event_evaluation_ave;
        const event_date = eventlogData.event_date;
        const average_charge = eventlogData.average_charge;
        const user_name = eventlogData.user_name;
        const attendees = eventlogData.attendees;
        const total_restaurant_comment = eventlogData.total_restaurant_comment;
        const total_event_comment = eventlogData.total_event_comment;
        const restaurant_name = eventlogData.restaurant_name;
        const genre = eventlogData.genre;
        const restaurant_address = eventlogData.restaurant_address;
        const restaurant_image = eventlogData.restaurant_image;
        const restaurant_public_evaluation = eventlogData.restaurant_public_evaluation;
        console.log(guest_email);
        setEventName(event_name);
        setRestaurantEvaluationAve(restaurant_evaluation_ave);
        setEventEvaluationAve(event_evaluation_ave);
        setEventDate(event_date);
        setAverageCharge(average_charge);
        setUserName(user_name);
        setAttendees(attendees);
        setTotalRestaurantComment(total_restaurant_comment);
        setTotalEventComment(total_event_comment);
        setRestaurantName(restaurant_name);
        setGenre(genre);
        setRestaurantAddress(restaurant_address);
        setRestaurantImage(restaurant_image);
        setRestaurantPublicEvaluation(restaurant_public_evaluation);
        setEventlog(eventlogData);
        console.log(eventlogData);
        };

        fetchAndSetGuest();



    }, []);

    return (
        <>
            <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
                <OneUserInfoCard {...guest} />
            </div>
        </>
    )
}