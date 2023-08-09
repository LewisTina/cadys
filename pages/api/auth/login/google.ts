import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/login/google:
 *   post:
 *     summary: Login with google account
 *     description: Login user with google account
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