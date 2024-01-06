import Link from 'next/link';

const page = async () => {
  const getPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
  };

  const posts = await getPosts();
  return (
    <main className="flex flex-wrap justify-center">
      <h1 className="w-full text-center mb-4 mt-4 text-3xl">Blog List</h1>
      {posts.map(({ id, title }) => (
        <Link key={id} href={`/blog/${id}`}>
          <div className="m-2 p-2 border rounded hover:bg-gray-200 cursor-pointer w-64 h-32 flex justify-center items-center text-center">
            {title}
          </div>
        </Link>
      ))}
    </main>
  );
};
export default page;