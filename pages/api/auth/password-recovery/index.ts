import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/password-recovery:
 *   put:
 *     summary: Password recovery
 *     description: Password recovery
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