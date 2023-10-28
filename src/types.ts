type CurrentUser = {
  id: string;
  name: string;
  email: string;
  phone: string[];
  joined: Date;
  persons: Person[];
  roles: Role[];
  relations: Relation[];
};

type User = {
  id: string;
  name: string;
  email: string;
  personId: string;
  phone: string[];
  joined: Date;
};

type Person = {
  id: string;
  name: string;
  email: string[];
  phone: string[];
  description: string;
  userId: string;
};

type Role = {
  id: string;
  name: string;
  userId: string;
};

type Relation = {
  id: string;
  roleId: string;
  name: "";
  isPersonId: string;
  ofPersonId: string;
  userId: string;
};

const currentUserDefault: CurrentUser = {
  id: "",
  name: "",
  email: "",
  phone: [""],
  joined: new Date(),
  persons: [],
  roles: [],
  relations: [],
};

const personDefault: Person = {
  id: "",
  name: "",
  email: [""],
  phone: [""],
  description: "",
  userId: "",
};

const roleDefault: Role = {
  id: "",
  name: "",
  userId: "",
};

const relationDefault: Relation = {
  id: "",
  roleId: "",
  name: "",
  isPersonId: "",
  ofPersonId: "",
  userId: "",
};

const color = [
  "dark",
  "gray",
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "orange",
];

export type { CurrentUser, User, Role, Relation, Person };
export {
  currentUserDefault,
  personDefault,
  roleDefault,
  relationDefault,
  color,
};
