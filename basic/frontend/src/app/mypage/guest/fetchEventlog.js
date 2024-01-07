export default async function fetchEventlog(guest_email) {
  const encodedMailAddress = encodeURIComponent(guest_email);
  const res = await fetch(`http://127.0.0.1:5000/eventlog?guest_email=${encodedMailAddress}`, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error('Failed to fetch eventlog');
  }
  return res.json();
}