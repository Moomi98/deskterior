import Banner from "@/src/components/common/Banner";
import Cards from "@/src/components/common/Cards";
import getWord from "@/src/constants/words";

export default function Home() {
  const cardItems = [
    {
      title:
        "우리집을 소개합니다!우리집을 소개합니다!우리집을 소개합니다!우리집을 소개합니다!",
      author: "김정현",
      updatedAt: new Date().getTime() - 1000000000,
      views: 10,
    },
    {
      title: "우리집을 소개합니다!",
      author: "김정현",
      updatedAt: new Date().getTime() - 10000000,
      views: 100002,
    },
    {
      title: "우리집을 소개합니다!",
      author: "김정현",
      updatedAt: new Date().getTime() - 10000,
      views: 10,
    },
    {
      title: "우리집을 소개합니다!",
      author: "김정현",
      updatedAt: new Date().getTime() - 1000000,
      views: 10,
    },
    {
      title: "우리집을 소개합니다!",
      author: "김정현",
      updatedAt: new Date().getTime() - 1000000,
      views: 10,
    },
    {
      title: "우리집을 소개합니다!",
      author: "김정현",
      updatedAt: new Date().getTime() - 1000000,
      views: 10,
    },
  ];
  return (
    <div>
      <Banner />
      <div className="flex h-full flex-col items-center justify-between py-10 overflow-hidden">
        <div className="w-full">
          <h3>{getWord("Home", "popularPost")}</h3>
          <Cards cards={cardItems} />
        </div>
      </div>
    </div>
  );
}
