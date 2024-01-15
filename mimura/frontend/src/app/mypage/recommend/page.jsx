"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import fetchRecommend_random from "./fetchRecommend_random";
import fetchRecommend_restaurant_public_evaluation from "./fetchRecommend_restaurant_public_evaluation";
import fetchRecommend_average_evaluation from "./fetchRecommend_average_evaluation";
import fetchRecommend_new_open from "./fetchRecommend_new_open";
import OneRecommendInfoCard from "../../components/one_recommend_info_card.jsx";

import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

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
            <div className="mb-8">
                <Button className="self-end" onClick={handleRecommendChange}>▶ 食べログ高評価</Button>
                <Button className="self-end" onClick={handleRecommendChange2}>▶ メンバーお勧め</Button>
                <Button className="self-end" onClick={handleRecommendChange3}>▶ New open</Button>
                <Button className="self-end" onClick={handleRecommendChange4}>▶ AIリコメンド</Button>
                <div className="flex flex-wrap m-2">
                    {Object.keys(recommends).map((key) => (
                        <div key={key} className="w-full">
                            <p className="font-bold mb-2">{key}</p>
                            <div className="flex flex-wrap justify-start">
                                {recommends[key].map((component, index) => (
                                    <OneRecommendInfoCard key={index} {...component} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}