// Import Modules
import type { NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// Define Types
type dbProps = {
  action: string;
  name: string;
  email: string[];
  phone: string[];
  id: string;
};

JSON.stringify(
  this,
  (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
);

// Handle functions

// Create person
async function createPerson(
  post: dbProps,
  res: NextApiResponse,
  isUser: boolean
) {
  try {
    // Update user if exists, else create new user
    const dbData = await prisma.person.findUnique({
      where: {
        email: post.email,
        userId: post.id,
      },
    });

    if (!dbData) {
      const dbData = await prisma.person.create({
        data: {
          name: isUser ? "self" : post.name,
          email: post.email,
          userId: post.id,
        },
      });
    }
    return res
      .status(200)
      .json({ dbData, msg: "Person created successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong." });
  }
}

// Get All persons
async function getAllPersons(post: dbProps, res: NextApiResponse) {
  try {
    const dbData = await prisma.person.findMany({
      where: {
        userId: post.id,
      },
    });
    if (!dbData) {
      return res.status(400).json({ msg: "No person found." });
    }
    return res
      .status(200)
      .json({ dbData, msg: "Persons collected successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong." });
  }
}

export { createPerson, getAllPersons };
