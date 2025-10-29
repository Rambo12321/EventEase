export interface eventInterface {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  bannerImage: string | null;
  type: string;
  location: string;
}

export interface eventCard {
  title: string;
  date: string | null;
  bannerImage: string | null;
  type: string;
  location: string;
}
