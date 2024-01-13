"use client";
import styles from './styles.module.css';
import { useEffect, useState,useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import fetchEvent from './fetchEvent';

import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Myparty3() {
    const router = useRouter();
    const event_id = useSearchParams().get('event_id');
    console.log(event_id);
    const shop = useRef('');
    const [event_name, setEventNate] = useState('');
    const [guest_email, setGuestEmail] = useState('');
    const [event_date, setEventDate] = useState('');
    const [event_time, setEventTime] = useState('');
    const [recommend, setRecommend] = useState('');

    useEffect(() => {
        const fetchAndSetEvent = async () => {
        const eventData = await fetchEvent(event_id);
        const event_name = eventData.event_name;
        const guest_email = eventData.guest_email;
        const event_date = eventData.event_date;
        const event_time = eventData.event_time;
        console.log(guest_email);
        setEventNate(event_name);
        setGuestEmail(guest_email);
        setEventDate(event_date);
        setEventTime(event_time);
        console.log(eventData);
        };

        fetchAndSetEvent();
    }, []);

    const [buttonStates, setButtonStates] = useState({
        "日本料理": false,
        "海鮮": false,
        "鮨": false,
        "天ぷら": false,
        "鍋": false,
        "郷土料理": false,
        "居酒屋": false,
        "焼き鳥": false,
        "焼肉": false,
        "ステーキ": false,
        "イタリアン": false,
        "ダイニングバー": false,
        "フレンチ": false,
        "スペイン料理": false,
        "中華料理": false,
        "韓国料理": false,
    });

    const [button2States, setButton2States] = useState({
        "日本酒": false,
        "焼酎": false,
        "ワイン": false,
        "スイーツ": false,
        "ダーツ": false,
        "カラオケ": false,
        "飲み放題あり": false,
        "個室": false,
        "貸切可": false,
        "禁煙": false,
        "喫煙可": false,
    });

    const [binaryString, setBinaryString] = useState('');
    const [binaryString2, setBinaryString2] = useState('');

    useEffect(() => {
        console.log('buttonStatesが更新されました:', buttonStates);
        const newBinaryString = Object.values(buttonStates)
            .map(value => value ? '1' : '0')
            .join('');
        setBinaryString(newBinaryString); // 状態を更新
        console.log(newBinaryString);
    }, [buttonStates]);

    useEffect(() => {
        console.log('button2Statesが更新されました:', button2States);
        const newBinaryString2 = Object.values(button2States)
            .map(value => value ? '1' : '0')
            .join('');
        setBinaryString2(newBinaryString2); // 状態を更新
        console.log(newBinaryString2);
    }, [button2States]);


    const toggleButtonState = (buttonName) => {
        setButtonStates((prevStates) => ({
            ...prevStates,
            [buttonName]: !prevStates[buttonName],
        }));
    };

    const toggle2ButtonState = (buttonName) => {
        setButton2States((prevStates) => ({
            ...prevStates,
            [buttonName]: !prevStates[buttonName],
        }));
    };

    const renderGenreButtons = () => {
        return Object.keys(buttonStates).map((buttonName) => (
            <Button
                key={buttonName}
                className={`rounded-full ${buttonStates[buttonName] ? "bg-red-500" : "bg-blue-500"}`}
                variant="ghost"
                onClick={() => toggleButtonState(buttonName)}>
                <Badge variant="secondary">{buttonName}</Badge>
            </Button>
        ));
    };

    const render2GenreButtons = () => {
        return Object.keys(button2States).map((buttonName) => (
            <Button
                key={buttonName}
                className={`rounded-full ${button2States[buttonName] ? "bg-red-500" : "bg-blue-500"}`}
                variant="ghost"
                onClick={() => toggle2ButtonState(buttonName)}>
                <Badge variant="secondary">{buttonName}</Badge>
            </Button>
        ));
    };

    const handleGuestChange = () => {
        const url = `/mypage/guest?guest_email=${guest_email}`;
        window.open(url, '_blank');
    };

    const handleRecommendChange = () => {
        const url = `/mypage/recommend?select=${binaryString}${binaryString2}`;
        window.open(url, '_blank');
    };

    const handleRestaurantChange = async() => {
        var restaurant_id = shop.current.value
        const body_msg = JSON.stringify({
            event_id: event_id,
            restaurant_id: restaurant_id,
        });
        console.log(body_msg);
        const response = await fetch('http://127.0.0.1:5000/restaurant', {
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
                router.push(`/mypage/task4?event_id=${event_id}`);
                // alert("Check")
            }
    };

    return (
        (<div key="1" className="max-w-4xl mx-auto my-8 p-8 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 flex justify-between items-center">
            {event_name}
            <Button variant="outline">
                <FileEditIcon className="h-4 w-4" />
            </Button>
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col">
                <label className="mb-2" htmlFor="start-date">
                    日付
                </label>
                <p className="border rounded-full px-4 py-2" id="start-date">
                {event_date}
                </p>
                </div>
                <div className="flex flex-col">
                <label className="mb-2" htmlFor="end-date">
                    時間
                </label>
                <p className="border rounded-full px-4 py-2" id="end-date">
                {event_time}
                </p>
                </div>
                <Button className="self-end">▶ 調整さん機能</Button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col">
                <label className="mb-2" htmlFor="name">
                    人数
                </label>
                <Select>
                    <SelectTrigger id="number">
                    <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <Select>
                <SelectContent position="popper">
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                </SelectContent>
                </Select>
                <Button className="self-end">▶ 出欠さん機能</Button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col">
                <label className="mb-2" htmlFor="email">
                    ゲスト
                </label>
                <p className="border rounded-full px-4 py-2">
                    {guest_email}
                </p>
                </div>
                <Button className="self-end" onClick={handleGuestChange}>▶ ゲストの好きな料理ジャンルやこだわりを探す</Button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col">
                <label className="mb-2" htmlFor="quantity">
                    予算(1人当たり)
                </label>
                <input
                    className="border rounded-full px-4 py-2"
                    min="0"
                    placeholder="Enter amount in units of 1000"
                    step="1000"
                    type="number" />
                </div>
                <Select>
                <SelectContent position="popper">
                    <SelectItem value="yen">円</SelectItem>
                    <SelectItem value="usd">ドル</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div className="mb-6">
                <label className="mb-2 block" htmlFor="details">店舗ジャンル</label>
                <ScrollArea className="h-32 w-full rounded-md border p-2">
                    <div className="space-x-2">
                        {renderGenreButtons()}
                    </div>
                </ScrollArea>
            </div>
            <div className="mb-6">
                <label className="mb-2 block" htmlFor="details">店舗ジャンル</label>
                <ScrollArea className="h-32 w-full rounded-md border p-2">
                    <div className="space-x-2">
                        {render2GenreButtons()}
                    </div>
                </ScrollArea>
                
            </div>
            <div className="mb-6">
                <label className="mb-2 block" htmlFor="note">
                店名
                </label>
                <input className="border rounded w-2/3 px-4 py-2"
                name="restaurant_id"
                type="number"
                onBlur={handleRestaurantChange}
                ref={shop}
                />
                <Button className="self-end" onClick={handleRecommendChange}>▶ リコメンド</Button>
            </div>
            
            <div className="flex justify-between items-center">
                <Button variant="outline">キャンセル</Button>
                <Button className="bg-blue-600 text-white">保存</Button>
            </div>
        </div>)
        );
    }


    function FileEditIcon(props) {
        return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
        </svg>)
        );
    }