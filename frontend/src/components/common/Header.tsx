"use client";

import Link from "next/link";
import styles from "@/src/components/common/Header.module.css";
import { FaUserCircle } from "react-icons/fa";
import getWord from "@/src/constants/words";
import { useRecoilState } from "recoil";
import { UserState } from "@/src/stores/User";
import { useEffect } from "react";

export default function Header() {
  const name = "Header";
  const [user, setUser] = useRecoilState(UserState);

  return (
    <header className="flex w-full h-16 p-4 bg-white place-content-between items-center">
      <Link className={styles.logo} href="/">
        {getWord(name, "logo")}
      </Link>
      <ul className={styles.menuContainer}>
        <li className={styles.menu}>{getWord(name, "showAll")}</li>
        <li className={styles.menu}>{getWord(name, "ranking")}</li>
        <li className={styles.menu}>{getWord(name, "tip")}</li>
        <li className={styles.menu}>{getWord(name, "register")}</li>
        <li className={styles.menu}>{getWord(name, "mypage")}</li>
        <Link href="/login">
          <li className="flex items-center gap-2">
            <FaUserCircle size={40} />
            {user.nickname ?? ""}
          </li>
        </Link>
      </ul>
    </header>
  );
}
