import { NextApiRequest, NextApiResponse } from 'next';
import { TokenRequiredDependence, verifyToken } from '../security';
import { User } from '../models/user';

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Get a user by uuid user
 *     description: Get a user by uuid user
 *     security:
 *       - TokenRequired: []
 *     tags: ["users"]
 *     parameters:
 *       - in: query
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyManager'
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
    const token = req.headers.authorization?.split(' ')[1] as string;
    await TokenRequiredDependence(res, token)

    return res.status(200).json(
      {
      }
    )

  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;