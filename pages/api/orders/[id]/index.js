import { getSession } from 'next-auth/react';
import Order from '@/models/Order';
import db from '@/utils/db'

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session.length ===  0) {
    return res.status(401).send('signing required');
  }

  await db.connect();

  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
};

export default handler;