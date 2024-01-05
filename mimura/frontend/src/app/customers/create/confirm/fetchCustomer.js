export default async function fetchCustomer(id) {
    const res = await fetch(`http://127.0.0.1:5000/customers?customer_id=${id}`, {cache: "no-cache"});
    if (!res.ok) {
      throw new Error('Failed to fetch customer');
    }
    return res.json();
  }

// export default async function loginUser(credentials) {
//   const res = await fetch(`http://127.0.0.1:5000/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(credentials),
//   });

//   if (!res.ok) {
//       throw new Error('ログインに失敗しました');
//   }

//   return res.json();
// }
