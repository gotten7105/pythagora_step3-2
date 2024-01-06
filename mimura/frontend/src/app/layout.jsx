import './globals.css';
import { Header } from '@/components/component/header';

export default function RootLayout({ children }) {
  return (
    <html lang="jp">
      <body>
      <Header />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}