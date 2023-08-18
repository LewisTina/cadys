import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../models/user';
import UserPreRegister from '../../models/user_preregister';
import { generateCode } from '@/src/utils/helper';
import db from '../../db/database';
import Mailer from '../../mailer';

/**
 * @swagger
 * /api/auth/register/validation-resend-code:
 *   put:
 *     summary: Resend code if the code is invalid
 *     description: Resend code if the code is invalid
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

      const userByEmail = await User.findOne({ where: { email } });
        if (!userByEmail) {
          return res.status(409).json({ detail: 'user_with_email_not_exist' });
        }
      
      const deleteOldCode = await UserPreRegister.destroy({
          where: {
            user_uuid: userByEmail.uuid
          }
        });

      const userPreRegister = await UserPreRegister.create({
        user_uuid: userByEmail.uuid,
        code: code,
        expired_date: new Date(Date.now() + 48 * 60 * 60 * 1000)
      })

        await db.transaction(async (transaction: any) => {
        await UserPreRegister.destroy({
          where: {
            user_uuid: userByEmail.uuid
          }, 
          transaction
        });      
        await userPreRegister.save({ transaction });      
      });

      const mailData = {
        email : baseData.email,
        subject: "Cadys | Confirmation de compte",
        content:{
          code: code
          },
        template: "confirmationMail"
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