export default async function fetchRecommend_new_open(select_code) {
  const res = await fetch(`http://127.0.0.1:5000/recommend_new_open?select=${select_code}`, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error('Failed to fetch event');
  }
  return res.json();
}