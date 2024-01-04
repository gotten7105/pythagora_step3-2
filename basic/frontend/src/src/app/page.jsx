"use client";

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
      router.push("http://localhost:3000/main");
    } else {
      console.log('送信失敗:', response.statusText);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2em' }}>
      <h1>Welcome back to Cheers!</h1>
      <form ref={formRef} onSubmit={handleSend}>
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

