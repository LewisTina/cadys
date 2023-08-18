import { NextApiRequest, NextApiResponse } from 'next';
import Mailer from '../../mailer';
import { generateCode } from '@/src/utils/helper';
import { User, UserStatusType } from '../../models/user';
import db from '../../db/database'
import UserPreRegister from '../../models/user_preregister';

/**
 * @swagger
 * /api/auth/password-recovery/resend-code:
 *   put:
 *     summary: Password recovery resend code
 *     description: Password recovery resend code
 *     tags: ["auth"]
 *     requestBody:
 *       description: Register resend code
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResendCode'
 *     responses:
 *       200:
 *         description: Success
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
 * 
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      const baseData = req.body;
      const code = generateCode()

      const email = baseData.email

      const user = await User.findOne({ 
        where: { 
          email : email
         } });
      if (!user) {
        return res.status(404).json({ detail: 'user_with_email_not_exist' });
      }

      if (user.status != UserStatusType.ACTIVATED) {
        return res.status(400).json({ detail: 'please_active_your_account' });
      }
      
      const deleteOldCode = await UserPreRegister.destroy({
          where: {
            user_uuid: user.uuid
          }
        });

      const userPreRegister = await UserPreRegister.create({
        user_uuid: user.uuid,
        code: code,
        expired_date: new Date(Date.now() + 48 * 60 * 60 * 1000)
      })

      await db.transaction(async (transaction: any) => {
      await UserPreRegister.destroy({
          where: {
            user_uuid: user.uuid
          }, 
          transaction
        });      
      await userPreRegister.save({ transaction });      
      });

      const mailData = {
        email : email,
        subject: "Cadys | Réinitialisation de mot de passe",
        content:{
          code: code
          },
        template: "resetPassword"
      }

      await Mailer(mailData);

      return res.status(200).json({ message: 'confirmation_code_sent' });
    }

    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'error_registering_user' });
    }
  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;