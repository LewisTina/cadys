import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../security';
import { User } from '../../models/user';
import { filterNonNullFields } from '@/src/utils/helper';

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: update user personal data
 *     description: update user personal data
 *     security:
 *       - TokenRequired: []
 *     tags: ["users"]
 *     requestBody:
 *       description: Login user with email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
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
 *       404:
 *         description: Not found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const token = req.headers.authorization?.split(' ')[1] as string;
    const baseData = req.body


    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = verifyToken(token)

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
    const user_uuid = decodedToken.id
    const email = baseData.email
    const phone = baseData.phone

    if (email) {
      const userByEmail = await User.findOne({ where: { email: email } });
      if (userByEmail) {
        return res.status(409).json({ detail: 'user_email_conflict' });
      }
    }

    if (phone) {
      const userByPhoneNumber = await User.findOne({ where: { phone: phone } });
      if (userByPhoneNumber) {
        return res.status(409).json({ detail: 'user_phone_conflict' });
      }
    }

    const cleanData = filterNonNullFields(baseData)

    console.log(cleanData)

    await User.update(
      cleanData
    , {where: {uuid: user_uuid}})

    return res.status(200).json({ message: 'user_update_successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'error_updating_user' });
    }

  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;