export type AccountDataParams = {
  searchParams: { search?: string };
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  primaryEmailAddressId: string;
  emailAddresses: { id: string; emailAddress: string }[];
  publicMetadata: { role: string };
  createdAt: string;
  imageUrl: string;
  lastActiveAt?: string; // Replace status with lastActiveAt
  username: string;
};