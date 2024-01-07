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
    return (
        <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
            <div className="card-body">
                <h2 className="card-title">{event_name}</h2>
                <p>イベント満足度:{event_evaluation_ave}</p>
                <p>開催日:{event_date}</p>
                <p>会費:{average_charge}円</p>
                <p>幹事:{user_name}</p>
                <p>参加者:{attendees}</p>
                <p>イベントコメント:{total_event_comment}</p>
                <img src={restaurant_image}></img>
                <p>お店:{restaurant_name}</p>
                <p>住所:{restaurant_address}</p>
                <p>ジャンル:{genre}</p>
                <p>ぐるなび評価:{restaurant_public_evaluation}</p>
            </div>
        </div>
    );
}