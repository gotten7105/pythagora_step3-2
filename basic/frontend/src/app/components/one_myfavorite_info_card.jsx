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
    return (
        <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
            <div className="card-body">
                <h2 className="card-title">{restaurant_name}</h2>
                <img src={restaurant_image}></img>
                <p>ジャンル:{genre}</p>
                <p>予算目安:{average_charge}円</p>
                <p>定休日:{regular_holiday}</p>
                <p>住所:{restaurant_address}</p>
                <p>ぐるなび評価:{restaurant_public_evaluation}</p>
                <p>リンク:{restaurant_url}</p>
            </div>
        </div>
    );
}