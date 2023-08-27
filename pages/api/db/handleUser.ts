// Import Modules
import type { NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// Define Types
type dbProps = {
  action: string;
  name: string;
  email: string;
};

// Handle functions
async function getUser(post: dbProps, res: NextApiResponse) {
  // Update user if exists, else create new user
  try {
    let dbData = await prisma.user.findUnique({
      where: {
        email: post.email,
      },
    });

    if (!dbData) {
      dbData = await prisma.user.create({
        data: {
          name: post.name,
          email: post.email,
          joined: new Date(),
        },
      });
    }
    return res.status(200).json({ dbData, msg: "User updated successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong." });
  }
}

export { getUser };
