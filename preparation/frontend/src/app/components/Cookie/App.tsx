"use client";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

const App: React.FC = () => {
  const [inputVal, setInputVal] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const handlerDelete = () => {
    // クッキー名"name"のクッキーを削除
    removeCookie("name", inputVal);
  };

  const handlerSubmit = () => {
    // クッキー名"name"のクッキーを設定
    setCookie("name", inputVal);
  };

  return (
    <>
      <form onSubmit={() => handlerSubmit()}>
        <label>
          <input type="text" name="name" onChange={(e) => handlerChange(e)} />
        </label>
        <input type="submit" value="保存" />
        <button onClick={() => handlerDelete()}>削除</button>
      </form>
      <div>現在の値: {cookies.name}</div>
    </>
  );
};

export default App;