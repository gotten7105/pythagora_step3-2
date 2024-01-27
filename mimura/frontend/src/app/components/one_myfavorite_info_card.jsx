import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";

export default function OneMyfavoriteInfoCard({
    restaurant_id,
    restaurant_name,
    genre,
    average_charge,
    restaurant_address,
    restaurant_url,
    restaurant_image,
    regular_holiday,
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

    return (
        <>
        <Card className="bg-white">
            <CardHeader>
                <CardTitle style={{ wordWrap: "break-word", maxWidth: "300px"}}><a href={restaurant_url} target="_blank" rel="noopener noreferrer">{restaurant_name}</a></CardTitle>
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
                <div className="flex items-center justify-between">
                    <div className="flex items-center">グルメサイト評価　
                    {renderStars()}
                    </div>
                    <span>{restaurant_public_evaluation}</span>
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