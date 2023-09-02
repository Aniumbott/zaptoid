type User = {
  id: string;
  name: string;
  email: string;
  phone: String[];
  joined: Date;
};

type Relation = {
  id: string;
  name: string;
  isPersonId: string;
  ofPersonId: string;
  userId: string;
};

type Person = {
  id: string;
  name: string;
  email: string[];
  phone: String[];
  description: string;
  userId: string;
};

export type { User, Relation, Person };
