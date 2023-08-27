// Import Modules
import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "./handleUser";
import { getAllPersons, createPerson } from "./handlePerson";
import { getRelations } from "./handleRelation";

BigInt.prototype.toJSON = function () { // Ignore the error
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
        case "createUserPerson": // Handle userperson objrct
          return await createPerson(post, res, true);
        case "getRelations": // Handle =to collect all the specific relations
          return await getRelations(post, res);
        default:
          return res.status(400).json({ msg: "Invalid action." });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong." });
  }
}
