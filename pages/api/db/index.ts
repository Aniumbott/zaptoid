// Import Modules
import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "./handleUser";
import { getAllPersons, createPerson } from "./handlePerson";

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
        post.action // Hadle they action
      ) {
        case "getUser": // Handle user update as well create
          return await getUser(post, res);
        case "getAllPersons": // Handle user update as well create
          return await getAllPersons(post, res);
        case "createUserPerson": // Handle user update as well create
          return await createPerson(post, res, true);

        default:
          return res.status(400).json({ msg: "Invalid action." });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong." });
  }
}
