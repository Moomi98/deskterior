export const createdAt = (time: number): string => {
  const msgap = Date.now() - time;
  const minute = 60000;

  const minutegap = Math.floor(msgap / minute);
  const hourgap = Math.floor(msgap / (minute * 60));
  const dayGap = Math.floor(msgap / (minute * 3600));

  if (minutegap === 0) return "방금 전";
  else if (minutegap < 60) return `${minutegap}분 전`;
  else if (minutegap >= 60 && hourgap < 24) return `${hourgap}시간 전`;
  else return `${dayGap}일 전`;
};
