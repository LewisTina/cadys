import { NextApiRequest, NextApiResponse } from 'next';
import { UserStatusType, User, UserRoles } from '../../models/user';
import Mailer from '../../mailer'
import { generateCode } from '@/src/utils/helper';
import { v4 as uuidV4 } from 'uuid';
import { hashPassword } from '../../security';
import UserPreRegister from '../../models/user_preregister';
import db from '../../db';

/**
 * @swagger
 * /api/auth/register/first-step:
 *   post:
 *     summary: First step for creation customer account
 *     description: First step for creation customer account
 *     tags: ["auth"]
 *     requestBody:
 *       description: Customer registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreation'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *       404:
 *         description: Not found
 * 
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *          
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const baseData = req.body;
      const code = generateCode()

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

      const userRole = await UserRoles.findOne({ where: { code: "customer" } });
      if (!userRole) {
        throw new Error("Le rôle 'customer' n'a pas été trouvé.");
      }

      const user = await User.create({
        uuid: uuidV4(),
        password_hash: (await hashPassword(baseData.password)).toString(),
        email: baseData.email || '',
        phone: baseData.phone || '',
        role_uuid: userRole.uuid,
        status: UserStatusType.INACTIVATED,
        first_name : baseData.first_name,
        last_name : baseData.last_name,
        sex : baseData.sex,
      });


      const userPreRegister = await UserPreRegister.create({
        user_uuid: user.uuid,
        code: code,
        expired_date: new Date(Date.now() + 24 * 60 * 60 * 1000)
      })

      await  await db.transaction(async (transaction: any) => {
        await user.save({ transaction });      
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
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'error_registering_user' });
    }
  }

  return res.status(405).json({ message: 'method_not_allowed' });
}
