// Import Modules
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// Define Types
type dbProps = {
  action: string;
  name: string;
  email: string;
};

// Extra Functions
async function updateUser(post: dbProps, res: NextApiResponse) { // Update user if exists, else create new user
  if (post && !post.name.length) {
    return res.status(400).json({ msg: "Name is required." });
  }
  if (post && !post.email.length) {
    return res.status(400).json({ msg: "Name is required." });
  }
  const dbData = await prisma.user.findUnique({
    where: {
      email: post.email,
    },
  });

  try {
    if (!dbData) {
      const dbData = await prisma.user.create({
        data: {
          name: post.name,
          email: post.email,
        },
      });
      return res
        .status(200)
        .json({ dbData, msg: "User created successfully." });
    } else {
      const data = await prisma.user.update({
        where: {
          email: post.email,
        },
        data: {
          name: post.name,
        },
      });
      return res.status(200).json({ data, msg: "User updated successfully." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong." });
  }
}

// Export Module
export default async function getUser( // Handle POST request
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const post: dbProps = JSON.parse(req.body);
    if (req.method === "POST") {
      if (post.action === "updateUser") {
        return res.status(200).json(await updateUser(post, res));
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong." });
  }
}
