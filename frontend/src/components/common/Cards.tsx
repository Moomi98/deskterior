import { ICard } from "@/src/types/Card";
import Card from "./Card";

interface CardsProps {
  cards: ICard[];
}
export default function Cards(props: CardsProps) {
  return (
    <ul className="w-full flex gap-8">
      {props.cards.map((card, idx) => (
        <Card
          src={card.src}
          title={card.title}
          author={card.author}
          updatedAt={card.updatedAt}
          views={card.views}
          key={idx}
        />
      ))}
    </ul>
  );
}
