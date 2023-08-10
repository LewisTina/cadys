import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/auth/register/validation-resend-code:
 *   put:
 *     summary: Resend code if the code is invalid
 *     description: Resend code if the code is invalid
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