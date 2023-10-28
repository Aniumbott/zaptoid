// Import Modules
import type { NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// Define Types
type dbProps = {
  action: string;
  name: string;
  email: string;
  personId: string;
};

// Handle functions
async function getUser(post: dbProps, res: NextApiResponse) {
  // Update user if exists, else create new user
  try {
    let dbData = await prisma.user.upsert({
      where: {
        email: post.email,
      },
      update: {
        name: post.name,
        personId: post.personId,
      },
      create: {
        name: post.name,
        email: post.email,
        joined: new Date(),
      },
    });
    return res.status(200).json({ dbData, msg: "User updated successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong." });
  }
}

export { getUser };
