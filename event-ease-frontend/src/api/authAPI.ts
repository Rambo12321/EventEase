import { userTokenInterface } from "@/interfaces/userInterface";
import { apiRequest } from "@/lib/apiClient";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<userTokenInterface> => {
  return apiRequest(`/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<userTokenInterface> => {
  return apiRequest(`/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
