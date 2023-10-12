import Link from "next/link";
import styles from "@/src/components/common/Header.module.css";
import { FaUserCircle } from "react-icons/fa";
import getWord from "@/src/constants/words";

export default function Header() {
  const name = "Header";
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
        <li>
          <FaUserCircle size={40} />
        </li>
      </ul>
    </header>
  );
}
