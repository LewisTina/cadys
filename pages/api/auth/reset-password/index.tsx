import { NextApiRequest, NextApiResponse } from 'next';
import { User, UserStatusType } from '../../models/user';
import { hashPassword } from '../../security';

/**
 * @swagger
 * /api/auth/reset-password:
 *   put:
 *     summary: Ask for verification code for reset password
 *     description: Ask for verification code for reset password
 *     tags: ["auth"]
 *     requestBody:
 *       description: Register resend code
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {  
      const { email, new_password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(409).json({ detail: 'user_with_email_not_exist' });
        }

      if (user.status != UserStatusType.ACTIVATED) {
          return res.status(400).json({ detail: 'please_active_your_account' });
      }

      const password_hash= (await hashPassword(new_password as string)).toString()

      await User.update({password_hash: password_hash}, {where: {uuid: user.uuid}})

      return res.status(200).json({ message: 'password_reset_successfully',});
    }

    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'internal_server_error' });
    }
  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;