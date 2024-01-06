export default async function updateCustomer(formData) {
  
    const updated_customer_name = formData.get("customer_name");
    const updated_customer_id = formData.get("customer_id");
    const updated_age = formData.get("age");
    const updated_gender = formData.get("gender");
  
    const body_msg = JSON.stringify({
      customer_name: updated_customer_name,
      customer_id: updated_customer_id,
      age: updated_age,
      gender: updated_gender,
    })
  
    const res = await fetch(`http://127.0.0.1:5000/customers`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: body_msg,
    });
    if (!res.ok) {
      throw new Error('Failed to update customer');
    }
    
  };