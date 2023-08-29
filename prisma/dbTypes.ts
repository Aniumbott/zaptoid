type User = {
  id: string;
  name: string;
  email: string;
  phone: BigInt[];
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
  phone: BigInt[];
  description: string;
  userId: string;
};

export type { User, Relation, Person };
