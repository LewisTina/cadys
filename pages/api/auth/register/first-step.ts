import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/register/first-step:
 *   post:
 *     summary: First step for creation customer account
 *     description: First step for creation customer account
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