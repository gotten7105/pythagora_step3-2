export default async function fetchCustomers() {
    const res = await fetch('http://127.0.0.1:5000/allcustomers', { cache: "no-cache" });
    if (!res.ok) {
      throw new Error('Failed to fetch customers');
    }
    return res.json();
  }
  