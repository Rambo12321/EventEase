export interface userTokenInterface {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface userInterface {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface userMin {
  id: string;
  name: string;
}
