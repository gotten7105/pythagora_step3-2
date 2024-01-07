/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/6VUSZ7YBZSa
 */
import Link from "next/link"

export function Header() {
  return (
    (<header className="flex justify-between items-center h-20 px-4 md:px-6">
      <Link className="flex items-center" href="/home">
        <HomeIcon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <nav className="flex gap-4">
        <Link
          className="flex items-center gap-2 text-sm font-medium hover:underline underline-offset-2"
          href="#">
          <HomeIcon className="h-4 w-4" />
          <span>懇親会作成</span>
        </Link>
        <Link
          className="flex items-center gap-2 text-sm font-medium hover:underline underline-offset-2"
          href="#">
          <ServerIcon className="h-4 w-4" />
          <span>話題のお店</span>
        </Link>
        <Link
          className="flex items-center gap-2 text-sm font-medium hover:underline underline-offset-2"
          href="#">
          <ContactIcon className="h-4 w-4" />
          <span>ユーザー検索</span>
        </Link>
      </nav>
    </header>)
  );
}


function HomeIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>)
  );
}


function ServerIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="32"
      viewBox="0 0 29 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3.625 32C2.62812 32 1.77504 31.6422 1.06575 30.9266C0.356458 30.211 0.00120833 29.3498 0 28.3429V11.8857C0 11.3067 0.128687 10.7581 0.386062 10.24C0.643437 9.7219 0.998083 9.29524 1.45 8.96L12.325 0.731429C12.9594 0.24381 13.6844 0 14.5 0C15.3156 0 16.0406 0.24381 16.675 0.731429L27.55 8.96C28.0031 9.29524 28.3584 9.7219 28.6157 10.24C28.8731 10.7581 29.0012 11.3067 29 11.8857V28.3429C29 29.3486 28.6447 30.2098 27.9342 30.9266C27.2237 31.6434 26.3707 32.0012 25.375 32H3.625ZM11.7812 26.5143C12.0229 26.5143 12.2344 26.4229 12.4156 26.24C12.5969 26.0571 12.6875 25.8438 12.6875 25.6V19.2C13.4427 19.2 14.0849 18.9336 14.6142 18.4009C15.1434 17.8682 15.4075 17.2203 15.4062 16.4571V11.8857C15.4062 11.6419 15.3156 11.4286 15.1344 11.2457C14.9531 11.0629 14.7417 10.9714 14.5 10.9714C14.2583 10.9714 14.0469 11.0629 13.8656 11.2457C13.6844 11.4286 13.5937 11.6419 13.5937 11.8857V16.4571H12.6875V11.8857C12.6875 11.6419 12.5969 11.4286 12.4156 11.2457C12.2344 11.0629 12.0229 10.9714 11.7812 10.9714C11.5396 10.9714 11.3281 11.0629 11.1469 11.2457C10.9656 11.4286 10.875 11.6419 10.875 11.8857V16.4571H9.96875V11.8857C9.96875 11.6419 9.87812 11.4286 9.69687 11.2457C9.51562 11.0629 9.30416 10.9714 9.0625 10.9714C8.82083 10.9714 8.60937 11.0629 8.42812 11.2457C8.24687 11.4286 8.15625 11.6419 8.15625 11.8857V16.4571C8.15625 17.219 8.42087 17.867 8.95012 18.4009C9.47937 18.9349 10.121 19.2012 10.875 19.2V25.6C10.875 25.8438 10.9656 26.0571 11.1469 26.24C11.3281 26.4229 11.5396 26.5143 11.7812 26.5143ZM19.0312 26.5143C19.2729 26.5143 19.4844 26.4229 19.6656 26.24C19.8469 26.0571 19.9375 25.8438 19.9375 25.6V12.16C19.9375 11.8248 19.8245 11.5432 19.5986 11.3152C19.3726 11.0872 19.0929 10.9726 18.7594 10.9714C17.9437 10.9714 17.3323 11.3524 16.9251 12.1143C16.5179 12.8762 16.3137 13.7143 16.3125 14.6286V18.2857C16.3125 18.7733 16.5318 19.1165 16.9704 19.3152C17.4091 19.5139 17.7939 19.7803 18.125 20.1143V25.6C18.125 25.8438 18.2156 26.0571 18.3969 26.24C18.5781 26.4229 18.7896 26.5143 19.0312 26.5143Z" fill="#1521A4"/>
    </svg>)
  );
}

{/* <svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.625 32C2.62812 32 1.77504 31.6422 1.06575 30.9266C0.356458 30.211 0.00120833 29.3498 0 28.3429V11.8857C0 11.3067 0.128687 10.7581 0.386062 10.24C0.643437 9.7219 0.998083 9.29524 1.45 8.96L12.325 0.731429C12.9594 0.24381 13.6844 0 14.5 0C15.3156 0 16.0406 0.24381 16.675 0.731429L27.55 8.96C28.0031 9.29524 28.3584 9.7219 28.6157 10.24C28.8731 10.7581 29.0012 11.3067 29 11.8857V28.3429C29 29.3486 28.6447 30.2098 27.9342 30.9266C27.2237 31.6434 26.3707 32.0012 25.375 32H3.625ZM11.7812 26.5143C12.0229 26.5143 12.2344 26.4229 12.4156 26.24C12.5969 26.0571 12.6875 25.8438 12.6875 25.6V19.2C13.4427 19.2 14.0849 18.9336 14.6142 18.4009C15.1434 17.8682 15.4075 17.2203 15.4062 16.4571V11.8857C15.4062 11.6419 15.3156 11.4286 15.1344 11.2457C14.9531 11.0629 14.7417 10.9714 14.5 10.9714C14.2583 10.9714 14.0469 11.0629 13.8656 11.2457C13.6844 11.4286 13.5937 11.6419 13.5937 11.8857V16.4571H12.6875V11.8857C12.6875 11.6419 12.5969 11.4286 12.4156 11.2457C12.2344 11.0629 12.0229 10.9714 11.7812 10.9714C11.5396 10.9714 11.3281 11.0629 11.1469 11.2457C10.9656 11.4286 10.875 11.6419 10.875 11.8857V16.4571H9.96875V11.8857C9.96875 11.6419 9.87812 11.4286 9.69687 11.2457C9.51562 11.0629 9.30416 10.9714 9.0625 10.9714C8.82083 10.9714 8.60937 11.0629 8.42812 11.2457C8.24687 11.4286 8.15625 11.6419 8.15625 11.8857V16.4571C8.15625 17.219 8.42087 17.867 8.95012 18.4009C9.47937 18.9349 10.121 19.2012 10.875 19.2V25.6C10.875 25.8438 10.9656 26.0571 11.1469 26.24C11.3281 26.4229 11.5396 26.5143 11.7812 26.5143ZM19.0312 26.5143C19.2729 26.5143 19.4844 26.4229 19.6656 26.24C19.8469 26.0571 19.9375 25.8438 19.9375 25.6V12.16C19.9375 11.8248 19.8245 11.5432 19.5986 11.3152C19.3726 11.0872 19.0929 10.9726 18.7594 10.9714C17.9437 10.9714 17.3323 11.3524 16.9251 12.1143C16.5179 12.8762 16.3137 13.7143 16.3125 14.6286V18.2857C16.3125 18.7733 16.5318 19.1165 16.9704 19.3152C17.4091 19.5139 17.7939 19.7803 18.125 20.1143V25.6C18.125 25.8438 18.2156 26.0571 18.3969 26.24C18.5781 26.4229 18.7896 26.5143 19.0312 26.5143Z" fill="#1521A4"/>
</svg> */}


// (<svg
//   {...props}
//   xmlns="http://www.w3.org/2000/svg"
//   width="24"
//   height="24"
//   viewBox="0 0 24 24"
//   fill="none"
//   stroke="currentColor"
//   strokeWidth="2"
//   strokeLinecap="round"
//   strokeLinejoin="round">
//   <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
//   <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
//   <line x1="6" x2="6.01" y1="6" y2="6" />
//   <line x1="6" x2="6.01" y1="18" y2="18" />
// </svg>)

function ContactIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <circle cx="12" cy="10" r="2" />
      <line x1="8" x2="8" y1="2" y2="4" />
      <line x1="16" x2="16" y1="2" y2="4" />
    </svg>)
  );
}