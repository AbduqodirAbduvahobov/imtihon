let BASE_URL = "https://67f3d839cbef97f40d2c555a.mockapi.io/todo/";
export const useFetch = () => {
  const request = ({ url, method, data }) => {
    return fetch(`${BASE_URL}/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data, 
    })
      .then((data) => data.json())
      .catch((err) => console.log(err));
  };
  return request;
};
