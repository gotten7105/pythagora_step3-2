"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function AttendanceComponent() {
  const [attendance, setAttendance] = useState('');
  const [eventId, setEventId] = useState(null);
  const searchParams = useSearchParams();
  const event_id = searchParams.get('event_id');
  const router = useRouter(); // useRouterを追加

  useEffect(() => {
    if (event_id) {
      setEventId(event_id);
    }
  }, [event_id]);

  const submitAttendance = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:5000/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          event_id: event_id,
          attendance: attendance
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // 出欠情報登録成功時の処理
      alert('出欠情報を登録しました。');
      
      // 登録成功時に指定のURLに遷移
      router.push(`/mypage/task6?event_id=${event_id}`);
    } catch (error) {
      console.error('Failed to submit attendance:', error);
      alert('出欠情報の登録に失敗しました。');
    }
  };

  return (
    <div>
      <h2>出欠登録</h2>
      <select value={attendance} onChange={(e) => setAttendance(e.target.value)}>
        <option value="">選択してください</option>
        <option value="attend">出席</option>
        <option value="absent">不参加</option>
      </select>
      <button onClick={submitAttendance}>登録</button>
    </div>
  );
}

export default AttendanceComponent;
