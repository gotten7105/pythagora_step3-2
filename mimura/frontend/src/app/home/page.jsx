"use client"
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    const formRef = useRef();
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const email = formData.get("email");
        const password = formData.get("password");

        // バックエンドにリクエストを送信
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // 認証処理
        if (response.status === 200) {
            router.push("/home");
        } else {
            alert("認証に失敗しました。");
        }
    };

    return (
        <Card className="mx-auto max-w-md">
            <CardHeader className="space-y-2">
                <CardTitle className="text-3xl font-bold">マイページ作ります！</CardTitle>
                <CardDescription>マイページ作りますね！</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="name">懇親会名*</Label>
                        <Input id="name" name="name" placeholder="懇親会タイトルを入力してください" required type="text" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="guest">ゲスト</Label>
                        <Input id="guest" name="guest" placeholder="ゲストのメールアドレスを入力してください" required type="email" />
                    </div>
                    <Button className="w-full mt-4" type="submit">
                        作成
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}


// "use client"
// import { useState, useEffect } from 'react';

// export default function Home() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:5000/')
//       .then((res) => res.text())
//       .then((data) => setMessage(data));
//   }, []);

//   return (
//     <div>
//       <h1>Next.js + Flask</h1>
//       <p>{message}</p>
//     </div>
//   );
// }

// import { LoginForm } from "@/components/component/login-form";

// export default function Home(){
//   return(
//     <main className="flex min-h-screen flex-col item^center justify-between p-24">
//       <LoginForm />
//     </main>
//   )
// }