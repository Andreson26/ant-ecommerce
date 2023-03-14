import { getSession } from "next-auth/react";
import User from "@/models/User";
import db from "@/utils/db";
import bcryptjs from "bcryptjs";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res
      .status(400)
      .send({ message: `${req.method} method not allowed` });
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("signin required");
  }
  const { name, email, password } = req.body;
  const { user } = session;

  if (
    !name ||
    !email ||
    !email.includes("@") ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message:
        "validation failed - password should be at least 6 characters long.",
    });
    return;
  }
  await db.connect();
  const toUpdateUser = await User.findById(user._id);
  toUpdateUser.name = name;
  toUpdateUser.email = email;

  if (password) {
    toUpdateUser.password = bcryptjs.hashSync(password);
  }

  await toUpdateUser.save();
  await db.disconnect();
  res.send({
    message: "User updated",
  });
}
export default handler;
