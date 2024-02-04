export default async function fetchSetRestaurant(event_id) {
  const res = await fetch(`http://127.0.0.1:5000/set_restaurant?event_id=${event_id}`, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error('Failed to fetch set_restaurant');
  }
  return res.json();
}