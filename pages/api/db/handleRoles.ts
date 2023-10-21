// Import Modules
import type { NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// Define Types
type dbProps = {
  id: string;
  roleId: string;
  isPersonId: string;
  ofPersonId: string;
  userId: string;
};

// Handle functions
async function getRoles(post: dbProps, res: NextApiResponse) {
  // Update user if exists, else create new user
  try {
    const dbData = await prisma.role.findMany({
      where: {
        userId: post.userId,
      },
    });
    if (!dbData) {
      return res.status(400).json({ msg: "No roles found." });
    }
    return res
      .status(200)
      .json({ dbData, msg: "Roles collected successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong." });
  }
}

// Create role
async function createRole(post: any, res: NextApiResponse) {
  try {
    const dbData = await prisma.role.create({
      data: {
        name: post.name,
        userId: post.userId,
      },
    });
    return res.status(200).json({ dbData, msg: "Role created successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong." });
  }
}

export { getRoles, createRole };
