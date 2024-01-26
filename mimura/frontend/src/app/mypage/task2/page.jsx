"use client";
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import fetchEvent from './fetchEvent';

import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function Myparty2() {
    const router = useRouter();
    const event_id = useSearchParams().get('event_id'); // パラメータ名をクォーテーションで囲む
    console.log(event_id);
    const [event_name, setEventNate] = useState('');
    const [guest_email, setGuestEmail] = useState('');
    const [event_date, setEventDate] = useState('');
    const [event_time, setEventTime] = useState('');

    useEffect(() => {
        const fetchAndSetEvent = async () => {
        const eventData = await fetchEvent(event_id);
        const event_name = eventData.event_name;
        const guest_email = eventData.guest_email;
        console.log(eventData);
        setEventNate(event_name);
        setGuestEmail(guest_email);
        };

        fetchAndSetEvent();
    }, []);

    const handleEventDateChange = async (event) => {
        setEventDate(event.target.value);
    };

    const handleEventTimeChange = async (event) => {
        setEventTime(event.target.value);

        if (event_date != "" && event_time != "" ) {
            const body_msg = JSON.stringify({
                event_date: event_date,
                event_time: event_time,
                event_id: event_id,
            });
            console.log(body_msg);
            localStorage.setItem('event_id', event_id);
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
                // alert("Check")
            }
        }
    };

    return  (
    (<div key="1" className="max-w-4xl mx-auto my-8 p-8 bg-white rounded-lg">
        <h2 className="text-2xl text-blue font-bold mb-6 flex justify-between items-center">
        {event_name}
        <Button variant="outline">
            <FileEditIcon className="h-4 w-4" />
        </Button>
        </h2>
        <form>
        <div className="grid md:grid-cols-3 gap-4 my-5">
            <div className="flex flex-col">
            <Label className="mb-2" htmlFor="start-date">
                日付
            </Label>
            <input className="border rounded-full px-4 py-2" id="start-date"
                name="event_date"
                type="date"
                onChange={handleEventDateChange}
            />
            </div>
            <div className="flex flex-col">
            <Label className="mb-2" htmlFor="end-date">
                時間
            </Label>
            <input className="border rounded-full px-4 py-2" id="end-date"
                name="event_time"
                type="time"
                onChange={handleEventTimeChange}
            />
            </div>
            <Button className="self-end">調整さん機能</Button>
        </div>
        <hr style={{ margin: '0 auto',  borderWidth: '2px' }}/>
        <div className="grid md:grid-cols-3 gap-4 my-5">
            <div className="flex flex-col">
            <label className="mb-2" htmlFor="name">
                人数
            </label>
            <Select>
                <SelectTrigger id="number">
                <SelectValue placeholder="参加人数を選択してください" />
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
            <Button className="self-end">出欠さん機能</Button>
        </div>
        <hr style={{ margin: '0 auto',  borderWidth: '2px' }}/>
        <div className="grid md:grid-cols-3 gap-4 my-5">
            <div className="flex flex-col">
            <label className="mb-2" htmlFor="email">
                ゲスト
            </label>
            <p className="border rounded-full px-4 py-2">
                {guest_email}
            </p>
            </div>
            <Button className="self-end">ゲストの好みをチェック</Button>
        </div>
        <hr style={{ margin: '0 auto',  borderWidth: '2px' }}/>
        <div className="grid md:grid-cols-3 gap-4 my-5">
            <div className="flex flex-col">
            <label className="mb-2" htmlFor="quantity">
                予算(1人当たり)
            </label>
            <input
                className="border rounded-full px-4 py-2"
                min="0"
                placeholder="1000円単位で選択"
                step="1000"
                type="number" />
            </div>
            <Select>
            <SelectContent position="popper">
                <SelectItem value="yen">円</SelectItem>
            </SelectContent>
            </Select>
        </div>
        <hr style={{ margin: '0 auto',  borderWidth: '2px' }}/>
        <div className="my-5">
            <label className="mb-2 block" htmlFor="details">
            店舗ジャンル
            </label>
            {/* <ScrollArea className="h-32 w-full rounded-md border p-2"> */}
            <div className="space-x-2 space-y-2">
                <Button className="rounded-full" variant="outline">日本料理</Button>
                <Button className="rounded-full" variant="outline">海鮮</Button>
                <Button className="rounded-full" variant="outline">鮨</Button>
                <Button className="rounded-full" variant="outline">天ぷら</Button>
                <Button className="rounded-full" variant="outline">鍋</Button>
                <Button className="rounded-full" variant="outline">郷土料理</Button>
                <Button className="rounded-full" variant="outline">居酒屋</Button>
                <Button className="rounded-full" variant="outline">焼き鳥</Button>
                <Button className="rounded-full" variant="outline">焼肉</Button>
                <Button className="rounded-full" variant="outline">ステーキ</Button>
                <Button className="rounded-full" variant="outline">イタリアン</Button>
                <Button className="rounded-full" variant="outline">ダイニングバー</Button>
                <Button className="rounded-full" variant="outline">フレンチ</Button>
                <Button className="rounded-full" variant="outline">スペイン料理</Button>
                <Button className="rounded-full" variant="outline">中華料理</Button>
                <Button className="rounded-full" variant="outline">韓国料理</Button>
            </div>
            {/* </ScrollArea> */}
        </div>
        <div className="mb-6">
            <label className="mb-2 block" htmlFor="message">
            こだわり
            </label>
            {/* <ScrollArea className="h-32 w-full rounded-md border p-2"> */}
            <div className="space-x-2 space-y-2">
                <Button className="rounded-full" variant="outline">日本酒</Button>
                <Button className="rounded-full" variant="outline">焼酎</Button>
                <Button className="rounded-full" variant="outline">ワイン</Button>
                <Button className="rounded-full" variant="outline">スイーツ</Button>
                <Button className="rounded-full" variant="outline">ダーツ</Button>
                <Button className="rounded-full" variant="outline">カラオケ</Button>
                <Button className="rounded-full" variant="outline">飲み放題あり</Button>
                <Button className="rounded-full" variant="outline">個室</Button>
                <Button className="rounded-full" variant="outline">貸切可</Button>
                <Button className="rounded-full" variant="outline">禁煙</Button>
                <Button className="rounded-full" variant="outline">喫煙可</Button>
            </div>
            {/* </ScrollArea> */}
        </div>
        <hr style={{ margin: '0 auto',  borderWidth: '2px' }}/>
        <div className="my-5">
            <label className="mb-2 block" htmlFor="note">
            店名
            </label>
            <input className="border rounded-full w-2/3 px-4 py-2" placeholder="店舗IDを入力してください" type="text" />
        </div>
        <div className="flex justify-between items-center">
            <Button variant="outline">キャンセル</Button>
            <Button className="text-white">保存</Button>
        </div>
        </form>
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