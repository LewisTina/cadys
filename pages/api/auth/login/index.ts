import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Sign in with email and password
 *     tags: ["auth"]
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found 
 */

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
  });
};

export default handler;