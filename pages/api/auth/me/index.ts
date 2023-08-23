import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../security';
import { User } from '../../models/user';

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user
 *     description: Get current connected user
 *     security:
 *       - TokenRequired: []
 *     tags: ["auth"]
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
    const token = req.headers.authorization?.split(' ')[1];


    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = verifyToken(token)
    console.log(token, decodedToken)

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user_uuid = decodedToken.id
    const user = await User.findOne({ where: { uuid: user_uuid } });
      if (!user) {
        return res.status(409).json({ detail: 'user-not-exist' });
      }

    return res.status(200).json(
      {
        user
      }
    )

  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;