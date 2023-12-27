import React from 'react';
import Head from 'next/head';
import './globals.css';

const MyFormComponent = () => {
  return (
    <div className="page-background">
      <Head>
        <title>山田さん壮行会</title>
      </Head>
      <div className="event-title">山田さん壮行会に参加しませんか？</div>
      <div className="details-text">日付 2023年5月13日 土曜日 19:00〜</div>
      <form className="form"> 
        <div className="input-field-container">
          <label htmlFor="name" className="input-label">氏名 *</label>
          <input type="text" id="name" className="input-field" placeholder="中村剛" />
        </div>
        <div className="input-field-container">
          <label htmlFor="email" className="input-label">メールアドレス *</label>
          <input type="email" id="email" className="input-field" placeholder="社用のものを使用してください" />
        </div>
        <div className="input-field-container">
          <label htmlFor="attendance" className="input-label">出欠 *</label>
          <input type="text" id="attendance" className="input-field" placeholder="" />
        </div>
        <div className="input-field-container">
          <label htmlFor="comment" className="input-label">コメント</label>
          <input type="text" id="comment" className="input-field" placeholder="" />
        </div>
        {/* その他のフィールド */}
        <button type="submit" className="button">回答</button>
      </form>
    </div>
  );
};

export default MyFormComponent;





