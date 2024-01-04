export default function OneUserInfoCard({
  user_name,
  company,
  user_class,
  working_area,
  user_category1,
  user_category2,
  user_category3
}) {
  return (
    <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
      <div className="card-body">
        <h2 className="card-title">{user_name}さん</h2>
        <p>Company: {company}</p>
        <p>Class: {user_class}</p>
        <p>Area {working_area}</p>
        <p>{user_category1}</p>
        <p>{user_category2}</p>
        <p>{user_category3}</p>
      </div>
    </div>
  );
}