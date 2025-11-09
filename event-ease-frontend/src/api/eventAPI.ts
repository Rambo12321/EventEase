import { apiRequest } from "@/lib/apiClient";
import { eventInterface } from "@/interfaces/eventInterface";
import { eventSubmitType } from "@/schemas/eventSchema";
export const getAllUserEvents = async (
  userId: string
): Promise<eventInterface[]> => {
  console.log("Getting events of user -> ", userId);
  return apiRequest(`/event/user?id=${userId}`, {
    method: "GET",
  });
};

export const getAllGlobalEvents = async (): Promise<eventInterface[]> => {
  return apiRequest("/event/global", {
    method: "Get",
  });
};

export const getEventById = async (
  data: eventInterface
): Promise<eventInterface> => {
  const id = data.id;
  return apiRequest(`/event/${id}`, {
    method: "GET",
    body: JSON.stringify(data),
  });
};

export const postEvent = async (
  data: eventSubmitType,
  token: string
): Promise<{ message: string }> => {
  const dateConverted = new Date(data.date).toISOString();
  data.date = dateConverted;

  console.log("Sending the data -> ", data);
  return await apiRequest("/event", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
