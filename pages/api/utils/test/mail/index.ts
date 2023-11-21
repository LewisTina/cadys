import { TokenRequiredDependenceAdmin } from '@/pages/api/security';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/utils/test/mail:
 *   post:
 *     summary: Send email test
 *     description: Send email test
 *     tags: ["utils"]
 *     requestBody:
 *       description: Login user with email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const token = req.headers.authorization?.split(' ')[1] as string;
    await TokenRequiredDependenceAdmin(res, token)

    return res.status(200).json(
        {
        }
  )

}

return res.status(405).json({ message: 'method_not_allowed' });

};