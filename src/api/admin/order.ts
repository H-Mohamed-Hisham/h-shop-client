import { getRequest, defaultHeaders } from "utils/http-request";

export const getAllOrders = async (queryKey: any) => {
  if (queryKey.length === 1) queryKey.push({});

  const response = await getRequest(
    `${process.env.REACT_APP_SERVER_URL}/admin/order/list`,
    {},
    await defaultHeaders()
  );

  return response;
};
