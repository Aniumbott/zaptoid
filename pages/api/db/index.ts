// Import Modules
import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "./handleUser";
import { getAllPersons, updatePerson, createPerson } from "./handlePerson";
import { getRoles } from "./handleRoles";
import { getRelations, updateRelations } from "./handleRelation";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// Export Module
export default async function handleDbRequest( // Handle POST request
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const post: any = JSON.parse(req.body);
    if (req.method === "POST") {
      switch (
        post.action // Types of actions
      ) {
        case "getUser": // Handle user update as well create
          return await getUser(post, res);
        case "getAllPersons": // Handle to colect all the persons
          return await getAllPersons(post, res);
        case "createPerson": // Handle person objrct
          if (post.isUser) return await createPerson(post, res, true);
          return await createPerson(post, res, false);
        case "getRoles":
          return await getRoles(post, res);
        case "getRelations": // Handle to collect all the specific relations
          return await getRelations(post, res);
        case "updatePerson": // Handle person update
          return await updatePerson(post, res);
        case "updateRelations": // Handle relation update
          return await updateRelations(post, res);
        default:
          return res.status(400).json({ msg: "Invalid action." });
      }
    }
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ msg: err.msg });
  }
}
