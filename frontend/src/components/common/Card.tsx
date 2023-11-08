import Image from "next/image";
import { ICard } from "@/src/types/Card";
import styles from "@/src/components/common/Card.module.css";
import { createdAt } from "@/src/utils/time";
import getWord from "@/src/constants/words";
import { useMemo } from "react";

export default function Card(props: ICard) {
  const formattedViews = useMemo(() => {
    return props.views > 10000 ? `10000+` : props.views;
  }, [props.views]);

  return (
    <li>
      <div className={styles.cardImage}>
        {props.src && (
          <Image src={props.src} alt="card" width={299} height={300} />
        )}
      </div>
      <h4 className={styles.title}>{props.title}</h4>
      <div className="w-full flex justify-between mt-2">
        <div className="flex gap-2 items-center">
          <div className={styles.profile}>
            {props.profile && (
              <Image src={props.profile} alt="profile" width={25} height={25} />
            )}
          </div>
          <span className={styles.author}>{props.author}</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className={styles.updatedAt}>{createdAt(props.updatedAt)}</span>
          <div className="flex gap-1">
            <span className={styles.updatedAt}>{getWord("Card", "views")}</span>
            <span className={styles.updatedAt}>{formattedViews}</span>
          </div>
        </div>
      </div>
    </li>
  );
}
