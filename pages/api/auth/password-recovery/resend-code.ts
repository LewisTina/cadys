import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/auth/password-recovery/resend-code:
 *   put:
 *     summary: Password recovery resend code
 *     description: Password recovery resend code
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