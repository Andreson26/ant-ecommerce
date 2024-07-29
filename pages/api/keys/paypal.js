import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    // Signed in
    return res.status(401).send("signing required");
  } else {
    // Not Signed in
    res.send(process.env.PAYPAL_CLIENT_ID || "sb");
  }
};

export default handler;
