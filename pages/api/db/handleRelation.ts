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
    let dbData = await prisma.relation.findMany({ // Collect all relations created by user
      where: {
        userId: post.id,
      },
    });

    if (post.isPersonId != "") { // Filter relations by isPersonId if exists
      dbData = dbData.filter( 
        (relation) => relation.isPersonId == post.isPersonId
      );
      if (post.ofPersonId != "") { // Filter relations by ofPersonId if exists
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

export { getRelations };
