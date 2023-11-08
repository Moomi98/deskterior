interface IWords {
  [key: string]: Record<string, string>;
}

const words: IWords = {
  Header: {
    logo: "Deskterior",
    showAll: "전체보기",
    ranking: "랭킹",
    tip: "꿀팁",
    register: "등록하기",
    mypage: "마이페이지",
  },

  Home: {
    popularPost: "인기 급상승 게시물",
  },

  Card: {
    views: "조회 수",
  },
};

export default function getWord(target: string, key: string): string {
  return words[target][key];
}
