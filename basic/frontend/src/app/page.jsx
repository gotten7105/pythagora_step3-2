"use client";

import styles from './styles.module.css';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

function App() {
  const formRef = useRef();
  const router = useRouter();

  const handleSend = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const body_msg = JSON.stringify({
      mail_address: formData.get("mail_address"),
      password: formData.get("password"),
    });

    const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body_msg,
    });

    if (response.ok) {
      const { access_token } = await response.json(); // JWTを取得
      localStorage.setItem('access_token', access_token); // JWTをローカルストレージに保存

      // JWTをクエリパラメータではなく、ローカルストレージで管理する
      router.push(`http://localhost:3000/mypage?mail_address=${formData.get("mail_address")}`);
    } else {
      console.log('送信失敗:', response.statusText);
    }
  };

  return (
    <div className={styles.container}>
      <form ref={formRef} onSubmit={handleSend} style={{ width: '100%' }}>
        <h1>Welcome back to Cheers!</h1>
        <div>
          <label>
            メールアドレス:
            <input
              name="mail_address"
              type="email"
            />
          </label>
        </div>
        <div>
          <label>
            パスワード：
            <input
              name="password"
              type="password"
            />
          </label>
        </div>
        <button type="submit">SIGN IN</button>
      </form>
    </div>
  );
}

export default App;


