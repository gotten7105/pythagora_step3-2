export default async function fetchUser() {
  const res = await fetch('http://127.0.0.1:5000/user', { cache: "no-cache" });
  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }
  return res.json();
}