"use client"
import { useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

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
        router.push(`/cheers/update?event_id=${eventId}`);
    } else {
        console.log('送信失敗:', response.statusText);
    }
    };

    return (
        <div className="bg-[#FEF5EE] min-h-screen">
            <Card className="mx-auto max-w-md">
            <CardHeader className="space-y-2">
                <CardTitle className="text-3xl font-bold text-blue">＋ 懇親会作成</CardTitle>
                <CardDescription>新しい懇親会を企画しましょう！</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form ref={formRef} onSubmit={handleSend}>
                    <div className="space-y-2">
                        <Label htmlFor="name">懇親会名*</Label>
                        <Input id="name" name="event_name" placeholder="懇親会タイトルを入力してください" required type="text" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="guest">ゲスト</Label>
                        <Input id="guest" name="guest_email" placeholder="ゲストのメールアドレスを入力してください" required type="email" />
                    </div>
                    <Button className="w-full mt-4" type="submit">
                        作成
                    </Button>
                </form>
            </CardContent>
            </Card>
        </div>
    );
}

export default Make_party;