
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/auth/register/reset-password/validate:
 *   put:
 *     summary: Validate verification code for reset password
 *     description: Validate verification code for reset password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/'
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