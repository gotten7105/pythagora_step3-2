import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";


export default function OneEventlogInfoCard({
    event_name,
    restaurant_evaluation_ave,
    event_evaluation_ave,
    event_date,
    average_charge,
    user_name,
    guest_email,
    attendees,
    total_restaurant_comment,
    total_event_comment,
    restaurant_name,
    genre,
    restaurant_address,
    restaurant_image,
    restaurant_public_evaluation,
}) {
    // 評価を四捨五入
    const roundedEvaluation = Math.round(restaurant_public_evaluation);

    // 星アイコンを生成する関数
    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <StarIcon 
                    key={i}
                    className={i <= roundedEvaluation ? "text-yellow-400" : "text-gray-300"} 
                />
            );
        }
        return stars;
        
    };

        // 評価を四捨五入
        const roundedEvaluation2 = Math.round(event_evaluation_ave);

        // 星アイコンを生成する関数
        const renderStars2 = () => {
            let stars = [];
            for (let i = 1; i <= 5; i++) {
                stars.push(
                    <StarIcon 
                        key={i}
                        className={i <= roundedEvaluation2 ? "text-blue" : "text-gray-300"} 
                    />
                );
            }
            return stars;
            
        };
    

    return (
        <>
        <Card className="bg-white mb-5">
            <CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-4 px-10 pb-5">
                    <div className="col-span-3 pb-5">
                        <CardTitle className="text-blue">{event_name}</CardTitle>
                    </div>
                    <div className="col-span-1 flex items-center justify-between">
                        <div className="flex items-center">
                        {renderStars2()}
                        </div>
                        <span>{event_evaluation_ave}</span>
                    </div>
                </div>
            <CardDescription>
                    <div className="grid grid-cols-1 md:grid-cols-2 px-10">
                        <div>
                            開催日：{event_date}
                            <br></br>
                            会費：{average_charge}円
                            <br></br>
                            幹事：{user_name}
                            <br></br>
                            参加者：{attendees}名
                        </div>
                        <div>
                        メモ：{total_event_comment}
                        </div>
                    </div>
            </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 px-10 gap-4">
                    <div className="flex justify-center items-center">
                        <img
                            alt="Food"
                            className="mb-2"
                            height={160}
                            src={restaurant_image}
                            style={{
                            aspectRatio: "300/200",
                            objectFit: "cover",
                            }}
                            width={240}
                        />
                    </div>
                    <div>
                        <CardDescription style={{ wordWrap: "break-word", maxWidth: "600px"}}>
                            {restaurant_name}
                            <br></br>
                            住所：{restaurant_address}
                            <br></br>
                            料理ジャンル：{genre}
                        </CardDescription>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                            {renderStars()}
                            </div>
                        <span>{restaurant_public_evaluation}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
        </>
    );
}

function StarIcon(props) {
    return (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
    )
}
