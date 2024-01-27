export default async function fetchMyfavorite(mail_address) {
    const encodedMailAddress = encodeURIComponent(mail_address);
    const res = await fetch(`http://127.0.0.1:5000/restaurant?mail_address=${encodedMailAddress}`, { cache: "no-cache" });
    if (!res.ok) {
        throw new Error('Failed to fetch user');
    }
    return res.json();
}