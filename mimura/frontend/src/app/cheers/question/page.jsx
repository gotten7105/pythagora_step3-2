"use client"
import { useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

function Make_invitation() {
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

    // const toggleButtonState = (buttonName) => {
    //     setButtonStates((prevStates) => ({
    //         ...prevStates,
    //         [buttonName]: !prevStates[buttonName],
    //     }));
    // };
    //     const renderGenreButtons = () => {
    //     return Object.keys(buttonStates).map((buttonName) => (
    //         <Button
    //             key={buttonName}
    //             className={`rounded-full ${buttonStates[buttonName] ? "bg-blue text-white" : "bg-background"}`}
    //             variant="outline"
    //             onClick={() => toggleButtonState(buttonName)}>
    //             {buttonName}
    //         </Button>
    //     ));
    // };


    return (
        <div className="bg-[#FEF5EE] min-h-screen">
            <Card className="container md:w-3/5 mx-auto px-10 py-5">
            <CardHeader className="space-y-2">
                <CardTitle className="text-3xl font-bold text-blue">濱田社長と新年会 はいかがでしたか？</CardTitle>
                <CardDescription>2024年1月31日　19:00～<br></br>@個室 泳ぎイカ 藁焼き小屋 た藁や 淀屋橋店</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form ref={formRef} onSubmit={handleSend}>
                    <div className="my-2">
                        <Label htmlFor="name">今回の懇親会会場を0点-5点で評価すると何点になりますか？</Label>
                        <Input id="name" name="event_name" placeholder="0-5" required type="text" />
                    </div>
                    <div className="my-2">
                        <Label htmlFor="guest">今回の懇親会自体を0点-5点で評価すると何点になりますか？</Label>
                        <Input id="guest" name="guest_email" placeholder="0-5" required type="text" />
                    </div>
                    <div className="my-2">
                        <Label htmlFor="atend">今回の懇親会に当てはまるものを選んでください</Label>
                        <div className="mb-1">
            <div className="space-x-2 space-y-2">
                <Button className="rounded-full" variant="outline">#飲み放題は時間ぴったり終了</Button>
                <Button className="rounded-full" variant="outline">#ボリューム多め</Button>
                <Button className="rounded-full" variant="outline">#個室はしっかり独立</Button>
                <Button className="rounded-full" variant="outline">#色んな人と会話しやすい</Button>
                <Button className="rounded-full" variant="outline">#飲み放題メニュー豊富</Button>
                <Button className="rounded-full" variant="outline">#幅広い年代に◎</Button>
                <Button className="rounded-full" variant="outline">#土足厳禁</Button>
                <Button className="rounded-full" variant="outline">#時間に厳しめ</Button>
                <Button className="rounded-full" variant="outline">#じっくり話すには不向き</Button>
            </div>
        </div>
                    </div>
                    <div className="my-2">
                        <Label htmlFor="comment">今後の幹事さんに役立つ、お店の情報・ゲストの情報があれば記入してください</Label>
                        <Input id="guest" name="guest_email" placeholder="例：鈴木役員は新潟県出身で◎◎酒造のお酒が特に好きらしいです。コースの提供がタイムリーでおすすめできる店舗です。" required type="text" />
                    </div>
                    <Button className="w-full mt-4" type="submit">
                        回答
                    </Button>
                </form>
            </CardContent>
            </Card>
        </div>
    );
}

export default Make_invitation;