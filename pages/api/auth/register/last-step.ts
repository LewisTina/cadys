import { NextApiRequest, NextApiResponse } from 'next';
import { User, UserStatusType } from '../../models/user';
import { Company, LegalStatus } from '../../models/company';
import { v4 as uuidV4 } from 'uuid';
import Mailer from '../../mailer';
import Address from '../../models/address';
import db from '../../db';
import { generateToken } from '../../security';

/**
 * @swagger
 * /api/auth/register/last-step:
 *   post:
 *     summary: Last step for creation customer account
 *     description: Last step for creation customer account
 *     tags: ["auth"]
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
 *             type: string
 *       404:
 *         description: Not found
 * 
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const baseData = req.body;

      const manager = baseData.manager_uuid
      const legal_status = baseData.legal_status

      const user = await User.findOne({ where: { uuid: manager } });
      if (!user) {
        return res.status(409).json({ detail: 'user-not-exist' });
      }

      if (user.status != UserStatusType.ACTIVATED) {
          return res.status(400).json({ detail: 'please_active_your_account' });
      }

      if (legal_status) {
        const legal_status_exist = await LegalStatus.findOne({ where: { uuid: legal_status } });
        if (!legal_status_exist) {
          return res.status(409).json({ detail: 'invalid_company_status' });
        }
      }

      const company_address = await Address.create({
        uuid: uuidV4(),
        zip_code: baseData.address.zip_code || '',
        city: baseData.address.city || '',
        address_title: baseData.address.address_title || '',
        client_uuid: manager || '',
      })

      const company = await Company.create({
        uuid: uuidV4(),
        email_pro: baseData.email_pro || '',
        name: baseData.name || '',
        siret: baseData.siret,
        activities: baseData.activities,
        address_uuid : company_address.uuid,
        legal_status_uuid : baseData.legal_status
      });

      await User.update({last_login: new Date(Date.now())}, {where: {uuid: manager}})

      await db.transaction(async (transaction: any) => {
        await company_address.save({ transaction });      
        await company.save({ transaction });      
        await User.update({last_login: new Date(Date.now())}, {where: {uuid: manager}, transaction})
      });

      const mailData = {
        email : user.email,
        subject: "Cadys | Bienvenue",
        content:{},
        template: "welcome"
      }

      await Mailer(mailData);


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
      return res.status(500).json({ message: 'error_registering_company' });
    }
  }

  return res.status(405).json({ message: 'method_not_allowed' });

};