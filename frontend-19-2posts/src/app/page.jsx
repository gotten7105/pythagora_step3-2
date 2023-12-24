// @client

// pages/index.jsx

'use client';
import React, { useState, useEffect } from 'react';
import { getPost, getPosts } from '../lib/getAPI';


// ホームページコンポーネント
export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // コンポーネントがマウントされた時に投稿を取得
    getPosts().then(data => {
      setPosts(data);
    });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}

