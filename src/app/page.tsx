import Link from "next/link";
import React from "react";

export default function Page() {
  const menuList = [{ title: "게시판", path: "/post" }];

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold">메뉴</h1>
      <hr className="my-8" />
      <ul>
        {menuList.map((items, idx) => (
          <Link href={items.path} key={idx}>
            <li className="mb-4 border bg-gray-400 font-bold text-white rounded-md pl-8 py-4">
              {items.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
