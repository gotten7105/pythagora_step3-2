"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import fetchRecommend_random from "./fetchRecommend_random";
import fetchRecommend_restaurant_public_evaluation from "./fetchRecommend_restaurant_public_evaluation";
import fetchRecommend_average_evaluation from "./fetchRecommend_average_evaluation";
import fetchRecommend_new_open from "./fetchRecommend_new_open";
import OneRecommendInfoCard from "../../components/one_recommend_info_card.jsx";

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"


export default function Recommend_page() {
    const select_code = useSearchParams().get("select");
    console.log(select_code);
    const [recommends, setRecommends] = useState({});
    const [restaurant_public_evaluation, setRestaurant_public_evaluation] = useState("");
    const [average_evaluation, setAverage_evaluation] = useState("");
    const [new_open, setNew_open] = useState("");
    const [random, setRandom] = useState("");

    //初回レンダリング
    useEffect(() => {
        const fetchAndSetRecommend_random = async () => {
        const recommendData = await fetchRecommend_random(select_code);
        setRecommends(recommendData);
        };

        fetchAndSetRecommend_random();
    }, []);

    //食べログ高評価button動作
    useEffect(() => {
        const fetchAndSetRecommend_restaurant_public_evaluation = async () => {
        const recommendData = await fetchRecommend_restaurant_public_evaluation(select_code);
        setRecommends(recommendData);
        };

        fetchAndSetRecommend_restaurant_public_evaluation();
    }, [restaurant_public_evaluation]);

    const handleRecommendChange = (event) => {
        event.preventDefault();
        setRestaurant_public_evaluation(event);
        };

    //メンバーお勧めbutton動作
    useEffect(() => {
        const fetchAndSetRecommend_average_evaluation = async () => {
        const recommendData = await fetchRecommend_average_evaluation(select_code);
        setRecommends(recommendData);
        };

        fetchAndSetRecommend_average_evaluation();
    }, [average_evaluation]);

    const handleRecommendChange2 = (event) => {
        event.preventDefault();
        setAverage_evaluation(event);
        };

    //New open button動作
    useEffect(() => {
        const fetchAndSetRecommend_new_open = async () => {
        const recommendData = await fetchRecommend_new_open(select_code);
        setRecommends(recommendData);
        };

        fetchAndSetRecommend_new_open();
    }, [new_open]);

    const handleRecommendChange3 = (event) => {
        event.preventDefault();
        setNew_open(event);
    };


    //ALリコメント(ランダム）button動作
    useEffect(() => {
        const fetchAndSetRecommend_random_again = async () => {
        const recommendData = await fetchRecommend_random(select_code);
        setRecommends(recommendData);
        };

        fetchAndSetRecommend_random_again();
    }, [random]);

    const handleRecommendChange4 = (event) => {
        event.preventDefault();
        setRandom(event);
        };



    return (
        <>
        <div className="container md:w-3/5 mx-auto px-10 py-5">
            <h1 className="text-2xl font-bold text-blue pb-5">
            cheersレコメンド
            </h1>
            <Label>フィルター</Label>
            <p className='text-sm py-2'>どんな店舗を探しますか？</p>
            <div className='space-x-2 space-y-2'>

            <span className="relative group">
            <span
                className={[
                    "whitespace-nowrap",
                    "rounded",
                    "bg-blue",
                    "px-2",
                    "py-1",
                    "text-white",
                    "absolute",
                    "-top-12",
                    "left-1/2",
                    "-translate-x-1/2",
                    "before:content-['']",
                    "before:absolute",
                    "before:-translate-x-1/2",
                    "before:left-1/2",
                    "before:top-full",
                    "before:border-4",
                    "before:border-transparent",
                    "before:border-t-blue",
                    "opacity-0",
                    "group-hover:opacity-100",
                    "transition",
                    "pointer-events-none",
                ].join(" ")}
            >
            食べログで人気のお店集めました
            </span>
            <Button className="self-end" onClick={handleRecommendChange}>グルメサイト高評価</Button>
            </span>

            <span className="relative group">
            <span
                className={[
                    "whitespace-nowrap",
                    "rounded",
                    "bg-blue",
                    "px-2",
                    "py-1",
                    "text-white",
                    "absolute",
                    "-top-12",
                    "left-1/2",
                    "-translate-x-1/2",
                    "before:content-['']",
                    "before:absolute",
                    "before:-translate-x-1/2",
                    "before:left-1/2",
                    "before:top-full",
                    "before:border-4",
                    "before:border-transparent",
                    "before:border-t-blue",
                    "opacity-0",
                    "group-hover:opacity-100",
                    "transition",
                    "pointer-events-none",
                ].join(" ")}
            >
            あなたの会社で開催された過去の懇親会で人気のお店
            </span>
            <Button className="self-end" onClick={handleRecommendChange2}>あなたの会社で高評価</Button>
            </span>

            <span className="relative group">
            <span
                className={[
                    "whitespace-nowrap",
                    "rounded",
                    "bg-blue",
                    "px-2",
                    "py-1",
                    "text-white",
                    "absolute",
                    "-top-12",
                    "left-1/2",
                    "-translate-x-1/2",
                    "before:content-['']",
                    "before:absolute",
                    "before:-translate-x-1/2",
                    "before:left-1/2",
                    "before:top-full",
                    "before:border-4",
                    "before:border-transparent",
                    "before:border-t-blue",
                    "opacity-0",
                    "group-hover:opacity-100",
                    "transition",
                    "pointer-events-none",
                ].join(" ")}
            >
            知る人ぞ知る！新しくお店を開拓したい方におすすめ
            </span>
            <Button className="self-end" onClick={handleRecommendChange3}>新規オープン店開拓</Button>
            </span>                 

            <span className="relative group">
            <span
                className={[
                    "whitespace-nowrap",
                    "rounded",
                    "bg-blue",
                    "px-2",
                    "py-1",
                    "text-white",
                    "absolute",
                    "-top-12",
                    "left-1/2",
                    "-translate-x-1/2",
                    "before:content-['']",
                    "before:absolute",
                    "before:-translate-x-1/2",
                    "before:left-1/2",
                    "before:top-full",
                    "before:border-4",
                    "before:border-transparent",
                    "before:border-t-blue",
                    "opacity-0",
                    "group-hover:opacity-100",
                    "transition",
                    "pointer-events-none",
                ].join(" ")}
            >
            cheersのDBをフル活用！AIレコメンド
            </span>
            <Button className="self-end" onClick={handleRecommendChange4}>cheersにおまかせ</Button>
            </span>
            </div>

            <div className="bg-[#FEF5EE] p-4 flex justify-center space-x-4">
                <div>
                    {Object.keys(recommends).map((key) => (
                        <div key={key} className="w-full">
                            <p className="font-bold my-5">{key}</p>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                {recommends[key].map((component, index) => (
                                    <OneRecommendInfoCard key={index} {...component} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}