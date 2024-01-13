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
    return (
        <div className="m-2 p-2 card bordered bg-blue-200 duration-200 hover:border-r-red flex-shrink-0 w-1/6 min-w-0">
            <div className="card-body">
                <h2 className="card-title text-lg">{restaurant_id}: {restaurant_name}</h2>
                <img src={restaurant_image} className="w-full h-auto mb-2"></img>
                <p>ジャンル: {genre}</p>
                <p>予算目安: {average_charge}円</p>
                <p>定休日: {regular_holiday}</p>
                <p>住所: {restaurant_address}</p>
                <p>ぐるなび評価: {restaurant_public_evaluation}</p>
                <p>Cheers評価: {average_evaluation}</p>
                <p>リンク: {restaurant_url}</p>
            </div>
        </div>
    );
}