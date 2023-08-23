import { NextApiRequest, NextApiResponse } from 'next';
import { User, UserStatusType } from '../../models/user';
import { comparePasswords, generateToken } from '../../security';
import db from '../../db';

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Sign in with email and password
 *     tags: ["auth"]
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
    try {
      const  {email, password} = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(404).json({ detail: 'user_with_email_not_exist' });
        }

      if (user.status != UserStatusType.ACTIVATED) {
          return res.status(400).json({ detail: 'please_active_your_account' });
      }

      const isPasswordMatch = await comparePasswords(password, user.password_hash)

      if (!isPasswordMatch){
        return res.status(400).json({detail: 'authentication_fail'})
      }

      await  await db.transaction(async (transaction: any) => {
        await User.update({last_login: new Date(Date.now())}, {where: {uuid: user.uuid}, transaction})
      });


      return res.status(200).json(
        { 
          message: 'success_connect',
          "token": {
            "access_token": generateToken({uuid: user.uuid, role: user.role_uuid}),
            "token_type": "bearer",
          },
          "new_user": true,
        }
        );
    
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'error_registering_user' });
    }
  }

  return res.status(405).json({ message: 'method_not_allowed' });

};