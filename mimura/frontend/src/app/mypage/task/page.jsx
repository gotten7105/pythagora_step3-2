"use client";
import styles from './styles.module.css';
import { useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


function Make_party() {
    const formRef = useRef();
    const router = useRouter();
    const mail_address = useSearchParams().get("mail_address");
    const handleSend = async (event) => {
        event.preventDefault();
    const formData = new FormData(formRef.current);
    const body_msg = JSON.stringify({
        event_name: formData.get("event_name"),
        guest_email: formData.get("guest_email"),
        mail_address: mail_address,
    });
    console.log(body_msg);
    const response = await fetch('http://127.0.0.1:5000/event', {
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

        // レスポンスからevent_idを取得
        const eventId = jsonData.event_id;

        // 取得したevent_idを使ってルーティング
        router.push(`/mypage/task2?event_id=${eventId}`);
    } else {
        console.log('送信失敗:', response.statusText);
    }
    };

    return (
        <div className={styles.container}>
        <form ref={formRef} onSubmit={handleSend} style={{ width: '100%' }}>
            <h1>＋懇親会作成</h1>
            <div>
            <label>
                懇親会名:
                <input
                name="event_name"
                type="text"
                />
            </label>
            </div>
        <div>
            <label>
                ゲスト：
                <input
                name="guest_email"
                type="email"
                />
            </label>
        </div>
        <button type="submit">登録</button>
        </form>
    </div>
    );
}

export default Make_party;
