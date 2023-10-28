// Import Modules
import type { NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// Define Types
type dbProps = {
  action: string;
  isPersonId: string;
  ofPersonId: string;
  id: string;
};

// Handle functions
async function getRelations(post: dbProps, res: NextApiResponse) {
  // Update user if exists, else create new user
  try {
    let dbData = await prisma.relation.findMany({
      // Collect all relations created by user
      where: {
        userId: post.id,
      },
    });

    if (post.isPersonId != "") {
      // Filter relations by isPersonId if exists
      dbData = dbData.filter(
        (relation) => relation.isPersonId == post.isPersonId
      );
      if (post.ofPersonId != "") {
        // Filter relations by ofPersonId if exists
        dbData = dbData.filter(
          (relation) => relation.ofPersonId == post.ofPersonId
        );
      }
    }
    if (dbData.length == 0) {
      return res.status(200).json({ msg: "No relations found." });
    }
    return res
      .status(200)
      .json({ dbData, msg: "Relations collected successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong." });
  }
}

// Delete or create relations
async function updateRelations(post: any, res: NextApiResponse) {
  try {
    if (post.task === "delete") {
      const dbData = await prisma.relation.delete({
        where: {
          id: post.id,
        },
      });
      return res
        .status(200)
        .json({ dbData, msg: "Relation deleted successfully." });
    } else {
      const dbData = await prisma.relation.create({
        data: {
          userId: post.userId,
          isPersonId: post.isPersonId,
          ofPersonId: post.ofPersonId,
          roleId: post.roleId,
        },
      });
      return res
        .status(200)
        .json({ dbData, msg: "Relation created successfully." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong." });
  }
}

export { getRelations, updateRelations };
