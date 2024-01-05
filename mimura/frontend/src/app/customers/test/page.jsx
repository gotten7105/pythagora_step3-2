export default function SignupPage() {
    const createAccount = async (formData) => {
      "use server";
  
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
  
      console.log({ name, email, password });
    };
  
    return (
      <form action={createAccount} method="POST">
        <p>text: <input type="text" name="name" className="input input-bordered" /></p>
        <p>email: <input type="email" name="email" className="input input-bordered" /></p>
        <p>password: <input type="password" name="password" className="input input-bordered" /></p>
        <button className="btn btn-primary m-4 text-2xl">submit</button>
      </form>
    );
  }

//   "use client"

// import React, { useState } from 'react';

// const Home = () => {
//   const [userInput, setUserInput] = useState('');
//   const [conversation, setConversation] = useState([]); // 会話の履歴を保存するための状態

//   // ユーザーの入力をバックエンドに送信し、応答を取得する関数
//   const handleSubmit = async (event) => {
//     event.preventDefault(); // デフォルトのフォーム送信を防止
//     if (!userInput.trim()) return; // 空の入力を無視する

//     const res = await fetch('http://localhost:5000/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // 会話履歴全体を送信
//       body: JSON.stringify({ conversation: [...conversation, { role: "user", content: userInput }] }),
//     });

//     const data = await res.json();

//     // 会話履歴にユーザーの質問とGPTの回答を追加
//     setConversation([
//       ...conversation,
//       { role: "user", content: userInput },
//       { role: "assistant", content: data.response }
//     ]);

//     // 入力フィールドをクリアする
//     setUserInput('');
//   };

//   return (
//     <div className="px-8">
//       <h1>Chat with GPT</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           placeholder="Say something..."
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Send
//         </button>
//       </form>

//       {/* 会話の履歴を新しいものから上に表示 */}
//       <div>
//         {conversation.slice().reverse().map((entry, index) => (
//           <div key={index}>
//             <p><strong>{entry.role === "user" ? "You" : "GPT"}:</strong> {entry.content}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;