import { NextApiRequest, NextApiResponse } from 'next';
import { TokenRequiredDependence, comparePasswords, hashPassword, verifyToken } from '../../security';
import { User } from '../../models/user';

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
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
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
 *         description: Not authorized
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const token = req.headers.authorization?.split(' ')[1] as string;
    const {old_password, new_password} = req.body


    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = verifyToken(token)

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
    const user_uuid = decodedToken.id

    
    const user = await User.findOne({ where: { uuid: user_uuid } });
    
    if (!user) {
      return res.status(404).json({ detail: 'user_not_exist' });
    }

    const isPasswordMatch = await comparePasswords(old_password, user.password_hash)

    if (!isPasswordMatch){
      return res.status(400).json({detail: 'old_password_not_match'})
    }

    const password_hash= (await hashPassword(new_password as string)).toString()

    await User.update({password_hash: password_hash}, {where: {uuid: user_uuid}})

    return res.status(200).json({ message: 'password_update_successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'error_updating_user' });
    }
  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;