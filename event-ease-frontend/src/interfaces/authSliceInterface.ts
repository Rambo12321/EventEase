import { userInterface as User } from "@/interfaces/userInterface";

export interface authState {
  token: string | null;
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
