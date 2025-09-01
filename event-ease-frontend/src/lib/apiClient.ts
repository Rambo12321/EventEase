const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

let MAIN_URL;

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  MAIN_URL = `${API_URL}${endpoint}`;
  try {
    const res = await fetch(`${MAIN_URL}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(
        `Error fetch URL : ${MAIN_URL}. Status code -> ${res.status}`
      );
    }
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
