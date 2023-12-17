async function fetchTest(){
  const staticData = await fetch(`http://127.0.0.1:5000/store`);
  return staticData.json();
}

export default async function Page() {
  const stores = await fetchTest();
  return <pre>{JSON.stringify(stores, null, 2)} </pre>
}