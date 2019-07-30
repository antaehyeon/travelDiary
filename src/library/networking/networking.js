export const requestTourList = async () => {
  return fetch(
    "http://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList?serviceKey=qzl9%2F81ElJeTcryy3QygJcJ6MgjLTh9Mbg3jOhf802bjStgQ%2BfqBiy4lC2aHuEg3VZxIsiM97zxzNE0TgGwaoQ%3D%3D&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&listYN=Y&arrange=A&mapX=126.94833333333334&mapY=37.5561111&radius=5000",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(responseJson => {
      console.log("[MAIN CONTAINER] fetch responseJson", responseJson);
      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
};
