"use client";

import { useState } from 'react';

function App() {
  const handleSend = async (e) => {
    e.preventDefault();

    const formData = JSON.stringify(form);
    console.log(form);
    const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('送信成功');
      const jsonData = await response.json();
      console.log(jsonData); // ← 追加
      window.location.href = "http://localhost:3000/main";
    } else {
      console.log('送信失敗:', response.statusText);
    }
  };

  const [form, setForm] = useState({ mail_address: '', password: '' });
  const handleChange = (e) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2em' }}>
      <h1>useStateでフォーム</h1>
      <form onSubmit={handleSend}>
        <div>
          <label>
            メールアドレス:
            <input
              name="mail_address"
              type="email"
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            パスワード：
            <input
              name="password"
              type="password"
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

