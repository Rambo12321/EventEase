import { userInterface } from "@/interfaces/userInterface";
import { apiRequest } from "@/lib/apiClient";

export const getAllUsers = async (): Promise<userInterface[]> => {
  return apiRequest("/user", {
    method: "GET",
  });
};

export const getUserById = async (id: string): Promise<userInterface> => {
  return apiRequest(`/user/${id}`, { method: "GET" });
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<userInterface> => {
  return apiRequest("/user", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const partialUpdateUser = async (
  id: string,
  data: Partial<{ name: string; email: string; password: string }>
): Promise<userInterface> => {
  return apiRequest(`/user/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const fullUpdateUser = async (
  id: string,
  data: { name: string; email: string; password: string }
): Promise<userInterface> => {
  return apiRequest(`/user/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteUser = async (id: string): Promise<userInterface> => {
  return apiRequest(`user/${id}`, {
    method: "DELETE",
  });
};
