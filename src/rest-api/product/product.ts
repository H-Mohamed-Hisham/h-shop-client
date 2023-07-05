import { getRequest, defaultHeaders } from "utils/http-request";

export const getProducts = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});
  const [key, { limit, skip }] = queryKey;

  const response = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/product`,
    {
      skip,
      limit,
    }
    // defaultHeaders()
  );

  console.log("Response : ", response);

  return response;
};
