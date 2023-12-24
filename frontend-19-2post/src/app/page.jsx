// @client

// pages/index.jsx

'use client';
import React, { useState, useEffect } from 'react';
import { getPost, getPosts } from '../lib/getAPI';


// ホームページコンポーネント
export default function HomePage() {
  const [postIds, setPostIds] = useState([]);

  useEffect(() => {
    // 最初の5つの投稿のIDを取得
    async function fetchPostIds() {
      const ids = [];
      for (let i = 1; i <= 5; i++) {
        const post = await getPost(i);
        ids.push(post.id);
      }
      setPostIds(ids);
    }

    fetchPostIds();
  }, []);

  return (
    <div>
      <h1>Post IDs</h1>
      {postIds.map(id => (
        <div key={id}>
          <p>Post ID: {id}</p>
        </div>
      ))}
    </div>
  );
}

