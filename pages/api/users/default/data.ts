import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/users/default/data:
 *   get:
 *     summary: Get Default data form.
 *     description: Default data form.
 *     security:
 *       - TokenRequired: []
 *     tags: ["users"]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *             type:
 *               string
 *       401:
 *         description: Unauthorized
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *       403:
 *         description: Not authorized
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return res.status(200).json(
      {
      }
    )

  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;