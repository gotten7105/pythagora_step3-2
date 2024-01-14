export default async function fetchGuest(guest_email) {
  const encodedMailAddress = encodeURIComponent(guest_email);
  const res = await fetch(`http://127.0.0.1:5000/guest?guest_email=${encodedMailAddress}`, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error('Failed to fetch guest');
  }
  return res.json();
}