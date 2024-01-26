export default async function fetchEvent(event_id) {
  const res = await fetch(`http://127.0.0.1:5000/event?event_id=${event_id}`, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error('Failed to fetch event');
  }
  return res.json();
}