export type LastActivity = {
  id: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  status: string;
  reason?: string;
  resource: string;
  date: string;
  validator: {
    id: string;
    name: string;
    email: string;
  };
};
