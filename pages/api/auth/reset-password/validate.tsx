import { NextApiRequest, NextApiResponse } from 'next';
import { Op } from 'sequelize'; 
import UserPreRegister from '../../models/user_preregister';
import { User, UserStatusType } from '../../models/user';

/**
 * @swagger
 * /api/auth/register/reset-password/validate:
 *   put:
 *     summary: Validate verification code for reset password
 *     description: Validate verification code for reset password
 *     tags: ["auth"]
 *     requestBody:
 *       description: Reset Password confirmation code
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Validation'
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
      const { code, email } = req.query;

      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(409).json({ detail: 'user_with_email_not_exist' });
        }

      if (user.status != UserStatusType.ACTIVATED) {
          return res.status(400).json({ detail: 'please_active_your_account' });
      }

      const userCode = await UserPreRegister.findOne({
        where: {
          user_uuid: user.uuid,
          code: code,
          expired_date: { [Op.gte]: new Date() }
        }
      });

      if (!userCode) {
        return res.status(404).json({ detail: 'code_invalid_or_expired' });
      }

      return res.status(200).json(
        { 
          message: 'code_successful_verified',
        });
    }

    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'internal_server_error' });
    }
  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;