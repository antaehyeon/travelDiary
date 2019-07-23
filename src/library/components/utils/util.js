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
