export default function OneGuestInfoCard({
  guest_id,
  guest_email,
  guest_category1,
  guest_category2,
  guest_category3,
  guest_memo,
}) {
  return (
    <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
      <div className="card-body">
        <h2 className="card-title">ゲスト：{guest_email}</h2>
        <p>好きなジャンル 1位:{guest_category1}</p>
        <p>好きなジャンル 2位:{guest_category2}</p>
        <p>好きなジャンル 3位:{guest_category3}</p>
        <p>メモ :  {guest_memo}</p>
      </div>
    </div>
  );
}