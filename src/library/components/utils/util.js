export const processFontType = fontType => {
  switch (fontType) {
    case "NSL":
      return "NanumSquareL";
    case "NSR":
      return "NanumSquareR";
    case "NSB":
      return "NanumSquareB";
    case "NSEB":
      return "NanumSquareEB";
    case "NBGR":
      return "NanumBarunGothicOTF";
    case "NBGB":
      return "NanumBarunGothicOTFBold";
    default:
      return "NanumSquareR";
  }
};

export const convertLocation = param => {
  console.log("[UTIL] convertLocation param", param);
  let result = 0.0;
  const M = 60;
  const S = 3600;
  const FIRST = 0;
  const MINUTES = 1;
  const SECONDS = 2;
  const splitedComma = param.split(",");

  splitedComma.forEach((element, idx) => {
    const splitedSlash = element.split("/");
    const DMSdata = parseFloat(splitedSlash[FIRST]);

    if (idx == MINUTES) result += DMSdata / M;
    else if (idx === SECONDS) result += DMSdata / S;
    else result += DMSdata;
  });

  console.log("[UTIL] convertLocation result", result);
  return result;
};
