import { getSession } from 'next-auth/react';
import Order from '@/models/Order';
import db from '@/utils/db';

const handler = async (req, res) => {
  await db.connect();
  const session = await getSession({ req });
  console.log(session)
  if (!session) {
    return res.status(401).send('signing required');
  }

  const { user }  = session;
  console.log(user)
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: user.id,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};
export default handler;
