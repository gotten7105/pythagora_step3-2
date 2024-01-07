"use client"
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

function LoginPage() {
    const formRef = useRef();
    const router = useRouter();
    const handleSend = async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const body_msg = JSON.stringify({
            mail_address: formData.get("mail_address"),
            password: formData.get("password"),
    });
        console.log(body_msg);
        const response = await fetch('http://127.0.0.1:5000/login', {
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
        router.push("/home");
    } else {
        console.log('送信失敗:', response.statusText);
    }
};

    return (
        <Card className="mx-auto max-w-lg">
            <CardHeader className="space-y-2">
                <CardTitle className="text-3xl font-bold text-blue">Login</CardTitle>
                <CardDescription>Welcome back to Cheers!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form ref={formRef} onSubmit={handleSend}>
                    <div className="space-y-2">
                        <Label htmlFor="email">メールアドレス</Label>
                        <Input id="email" name="mail_address" placeholder="Enter your mail address" required type="email" />
                    </div>
                    <div className="space-y-2 mt-4">
                        <Label htmlFor="password">パスワード</Label>
                        <Input id="password" name="password" placeholder="Enter your password" required type="password" />
                    </div>
                    <Button className="w-full mt-4" type="submit">
                        ログイン
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default LoginPage;

// export default function LoginPage() {
//     const formRef = useRef();
//     const router = useRouter();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const formData = new FormData(formRef.current);
//         const email = formData.get("email");
//         const password = formData.get("password");

//         // バックエンドにリクエストを送信
//         const response = await fetch('http://localhost:5000/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//         });

//         // 認証処理
//         if (response.status === 200) {
//             router.push("/home");
//         } else {
//             alert("認証に失敗しました。");
//         }
//     };

//     return (
//         <Card className="mx-auto max-w-md">
//             <CardHeader className="space-y-2">
//                 <CardTitle className="text-3xl font-bold">Login</CardTitle>
//                 <CardDescription>Welcome back to Cheers!</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//                 <form ref={formRef} onSubmit={handleSubmit}>
//                     <div className="space-y-2">
//                         <Label htmlFor="email">メールアドレス</Label>
//                         <Input id="email" name="email" placeholder="Enter your mail address" required type="email" />
//                     </div>
//                     <div className="space-y-2 mt-4">
//                         <Label htmlFor="password">パスワード</Label>
//                         <Input id="password" name="password" placeholder="Enter your password" required type="password" />
//                     </div>
//                     <Button className="w-full mt-4" type="submit">
//                         ログイン
//                     </Button>
//                 </form>
//             </CardContent>
//         </Card>
//     );
// }


// export default function CreatePage() {
//     const formRef = useRef();
//     const router = useRouter();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const formData = new FormData(formRef.current);
//         await createCustomer(formData);
//         router.push(`./create/confirm?customer_id=${formData.get("customer_id")}`);
//     };

//     return (
//         <>
//             <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
//                 <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
//                     <form ref={formRef} onSubmit={handleSubmit}>
//                         <div className="card-body">
//                             <h2 className="card-title">
//                                 <p><input type="text" name="customer_name" placeholder="桃太郎" className="input input-bordered" /></p>
//                             </h2>
//                             <p>メールアドレス:<input type="text" name="customer_id" placeholder="sample@mail.com" className="input input-bordered" /></p>
//                             <p>Age:<input type="number" name="age" placeholder="30" className="input input-bordered" /></p>
//                             <p>パスワード:<input type="text" name="gender" placeholder="password123" className="input input-bordered" /></p>
//                         </div>
//                         <div className="flex justify-center">
//                             <button type="submit" className="btn btn-primary m-4 text-2xl">
//                                 ログイン
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     )
// }
