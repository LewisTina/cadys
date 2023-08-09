import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/me:
 *   get:
 *     summary: Get current user
 *     description: Get current connected user
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