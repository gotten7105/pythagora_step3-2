'use client';
import { useEffect, useState } from 'react';
import QrcodeReader from './QrcodeReader';
import { CookiesProvider, useCookies } from "react-cookie";

export default function QrcodeReaderComponent3() {
    const [scannedTime, setScannedTime] = useState(new Date());
    const [scannedResult, setScannedResult] = useState('');
    const [user, setUser] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(["user_name"]);
    var cookie_name: any;

    // QRコードを読み取った時の実行する関数
    const onNewScanResult = (result: any) => {
        console.log('QRコードスキャン結果');
        console.log(result);
        setScannedTime(new Date());
        setScannedResult(result);
    };

    // クッキーを削除する関数
    const handleDelete = () => {
        removeCookie('user_name', { path: '/' });
    };

    async function fetchProduct(scannedResult) {
        const encodedQrcode = encodeURIComponent(scannedResult);
        const res = await fetch(`http://127.0.0.1:5000/user?user_id=${encodedQrcode}`, { cache: "no-cache" });
        if (!res.ok) {
            throw new Error('Failed to fetch user');
        }
        return res.json();
    }

    useEffect(() => {
        const fetchAndSetUser = async () => {
            const userData = await fetchProduct(scannedResult);
            setUser(userData);
            setCookie('user_name', userData.user_name, { path: '/' });
            const [newCookies, _] = useCookies(['user_name'])
            cookie_name = newCookies.user_name;
        }
        fetchAndSetUser();
    }, [scannedTime, scannedResult]);

    return (
        <CookiesProvider>
            <div>現在のユーザー名: {cookie_name}</div> {/* 修正点: ここでクッキー情報を表示 */}
            <div>
                <h2>スキャン日時：{scannedTime.toLocaleDateString()}</h2>
                <h2>スキャン結果：{scannedResult}</h2>
                {/* <h2>ようこそ{user.user_name}さん！</h2> */}
            </div>
            <QrcodeReader
                onScanSuccess={onNewScanResult}
                onScanFailure={(error: any) => {
                    // console.log('Qr scan error');
                }}
            />
            <button onClick={handleDelete}>クッキーを削除</button>
        </CookiesProvider>
    );
}