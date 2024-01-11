"use client"
// Mypage4.client.jsx
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import fetchEvent from './fetchEvent';
import './styles.css';

import { Button } from "@/components/ui/button";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";

export default function Mypage4() {
  const router = useRouter();
  const [searchParams] = useSearchParams();
  const event_id = useSearchParams().get('event_id');
  const [eventData, setEventData] = useState({});
  const [restaurantData, setRestaurantData] = useState({});
  const [loading, setLoading] = useState(true);

  // レストラン情報を取得する関数
  const fetchAndSetRestaurant = async (restaurantId) => {
    const response = await fetch(`http://localhost:5000/set_restaurant?event_id=${restaurantId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setRestaurantData(data);
  };

  useEffect(() => {
    const fetchAndSetEvent = async () => {
      try {
        const data = await fetchEvent(event_id);
        setEventData(data);
        await fetchAndSetRestaurant(data.restaurant_id);
      } catch (error) {
        console.error('Failed to fetch event data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (event_id) {
      fetchAndSetEvent();
    }
  }, [event_id]);

  if (loading) {
    return <p>Loading...</p>;
  }


  // JSX部分
  return (
    <div key="1" className="max-w-4xl mx-auto my-8 p-8 bg-white rounded-lg shadow">
      {/* イベント名と日時 */}
      <h2 className="text-2xl font-bold mb-6 flex justify-between items-center">
        {eventData.event_name}
      </h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="mb-2" htmlFor="start-date">日付</label>
          <p className="border rounded-full px-4 py-2" id="start-date">
            {eventData.event_date}
          </p>
        </div>
        <div className="flex flex-col">
          <label className="mb-2" htmlFor="end-date">時間</label>
          <p className="border rounded-full px-4 py-2" id="end-date">
            {eventData.event_time}
          </p>
        </div>
        <Button className="self-end">▶ 調整さん機能</Button>
      </div>

      {/* ゲスト情報 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="mb-2" htmlFor="email">ゲスト</label>
          <p className="border rounded-full px-4 py-2">
            {eventData.guest_email}
          </p>
        </div>
      </div>

      {/* 人数選択 */}
      <div className="flex flex-col mb-6">
        <label className="mb-2" htmlFor="number-select">予算(1人当たり)</label>
        <Select id="number-select">
          <SelectTrigger>
            <SelectValue placeholder="人数を選択" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="1">1人</SelectItem>
            <SelectItem value="2">2人</SelectItem>
            <SelectItem value="3">3人</SelectItem>
            <SelectItem value="4">4人</SelectItem>
            <SelectItem value="5">5人以上</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 店舗情報 */}
      <div className="divider"></div>
      <div className="card bordered">
        {restaurantData.restaurant_image && (
          <figure>
            <img src={restaurantData.restaurant_image} alt="Restaurant" className="rounded-lg"/>
          </figure>
        )}
        <div className="card-body">
          <h2 className="card-title">{restaurantData.restaurant_name}</h2>
          <p>ジャンル：{restaurantData.genre}</p>
          <p>平均予算：{restaurantData.average_charge}円</p>
          <p>住所：{restaurantData.restaurant_address}</p>
          <div className="card-actions justify-end">
            <a href={restaurantData.restaurant_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">店舗詳細</a>
          </div>
        </div>
      </div>

      {/* 操作ボタン */}
      <div className="flex justify-between items-center mt-6">
        <Button variant="outline">キャンセル</Button>
        <Button className="bg-blue-600 text-white">保存</Button>
      </div>
    </div>
  );
}
