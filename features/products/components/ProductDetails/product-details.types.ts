export type RentWithRenter = {
  id: number;
  rentPrice: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  renter?: {
    userProfile?: {
      firstName?: string;
      lastName?: string;
    };
  };
};
