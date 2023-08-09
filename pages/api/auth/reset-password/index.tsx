import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/register/reset-password:
 *   put:
 *     summary: Ask for verification code for reset password
 *     description: Ask for verification code for reset password
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