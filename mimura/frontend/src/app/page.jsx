import Link from 'next/link';
import Image from "next/image"

export default function Home() {
  return (
    <main>
      <h1 className="m-6 text-4xl text-center">
        <p>WebAPI Test App</p>
        <p className="text-2xl">(Blog API from jsonplaceholder)</p>
      </h1>


      <div className="flex justify-center">
        <Link href="/blog">
          <div className="cursor-pointer hover:bg-gray-200 border-2 rounded p-4">
            <p>Blogへ移動</p>
          </div>
        </Link>
      </div>
    </main>
  );
}