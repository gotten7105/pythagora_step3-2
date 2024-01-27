import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";

export default function OneRecommendInfoCard({
    restaurant_id,
    restaurant_name,
    genre,
    average_charge,
    restaurant_address,
    restaurant_url,
    restaurant_image,
    regular_holiday,
    restaurant_public_evaluation,
    average_evaluation,

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
    const roundedEvaluation2 = Math.round(average_evaluation);

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
        // <div className="m-2 p-2 card bordered bg-blue-200 duration-200 hover:border-r-red flex-shrink-0 w-1/6 min-w-0">
        //     <div className="card-body">
        //         <h2 className="card-title text-lg">{restaurant_id}: {restaurant_name}</h2>
        //         <img src={restaurant_image} className="w-full h-auto mb-2"></img>
        //         <p>ジャンル: {genre}</p>
        //         <p>予算目安: {average_charge}円</p>
        //         <p>定休日: {regular_holiday}</p>
        //         <p>住所: {restaurant_address}</p>
        //         <p>食べログ評価: {restaurant_public_evaluation}</p>
        //         <p>Cheers!評価: {average_evaluation}</p>
        //         <p>リンク: {restaurant_url}</p>
        //     </div>
        // </div>
        <>
        <Card className="bg-white">
            <CardHeader>
                <CardTitle style={{ wordWrap: "break-word", maxWidth: "300px", height: "50px"}}><a href={restaurant_url} target="_blank" rel="noopener noreferrer">{restaurant_id}｜{restaurant_name}</a></CardTitle>
                <CardDescription style={{ wordWrap: "break-word", maxWidth: "300px", height: "100px" }}>
                    {genre}
                    <br></br>
                    予算：{average_charge}
                    <br></br>
                    定休日：{regular_holiday}
                    <br></br>
                    住所：{restaurant_address}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <a href={restaurant_url} target="_blank" rel="noopener noreferrer">
                <img
                    alt="Food"
                    className="mb-2"
                    height={200}
                    src={restaurant_image}
                    // ref={{restaurant_url}}
                    style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                    }}
                    width={300}
                />
                </a>
                <div className="flex items-center justify-between">グルメサイト評価
                    <div className="flex items-center">
                    {renderStars()}
                    </div>
                    <span>{restaurant_public_evaluation}</span>
                </div>
                <div className="flex items-center justify-between">cheers評価
                    <div className="flex items-center">
                    {renderStars2()}
                    </div>
                    <span>{average_evaluation}</span>
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