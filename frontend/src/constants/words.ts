interface IWords {
  [key: string]: Record<string, string>;
}

const words: IWords = {
  Common: {
    cancel: "취소",
    register: "등록",
    title: "제목",
  },

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

  Write: {
    thumbnail: "이 곳에 썸네일을 등록해주세요.",
    warning: "사진의 크기는 20mb 이하만 등록 가능합니다.",
  },
};

export default function getWord(target: string, key: string): string {
  return words[target][key];
}
