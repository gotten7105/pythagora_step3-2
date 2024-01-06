export default async function deleteCustomer(id) {
    const res = await fetch(`http://127.0.0.1:5000/customers?customer_id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete customer');
    }
}