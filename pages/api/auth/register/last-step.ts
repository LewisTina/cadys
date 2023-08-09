import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/register/last-step:
 *   post:
 *     summary: Last step for creation customer account
 *     description: Last step for creation customer account
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