import React from 'react';
import Image from 'next/image';
import cheersLogo from '../components/cheers_logo.jpg'; // パスはプロジェクトの構成に応じて変更してください。

const Layout = ({ children }) => {
  return (
    <>
      <header style={{ backgroundColor: '#FEF5EE', padding: '10px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginLeft: '10px' }}>
          <Image src={cheersLogo} alt="Cheers Logo" width={75} height={50} /> {/* サイズは適宜調整してください */}
          {/* その他のヘッダー要素 */}
        </div>
      </header>
      <main>{children}</main>
      {/* フッターなど他の共通要素 */}
    </>
  );
};

export default Layout;
