import { NextApiRequest, NextApiResponse } from 'next';
import { TokenRequiredDependence } from '../../security';

/**
 * @swagger
 * /api/users/change-password:
 *   put:
 *     summary: Change user password
 *     description: Change user password
 *     security:
 *       - TokenRequired: []
 *     tags: ["users"]
 *     requestBody:
 *       description: brand registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BrandCreation'
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
  if (req.method === 'PUT') {
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