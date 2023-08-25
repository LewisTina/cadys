import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../security';
import { User } from '../../models/user';
import { Company, LegalStatus, Manager } from '../../models/company';
import Address from '../../models/address';
import { Activities } from '../../models/activites';

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user
 *     description: Get current connected user
 *     security:
 *       - TokenRequired: []
 *     tags: ["auth"]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyManager'
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
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];


    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = verifyToken(token)

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user_uuid = decodedToken.id

    const user = await User.findOne({ 
      where: { uuid: user_uuid },
      attributes: ['uuid', 'first_name', 'last_name', 'phone', 'sex', 'email', 'avatar_id', 'last_login'],
     });

    const brand_manager = await Manager.findOne({ 
      where: { manager_uuid: user_uuid }
    });

    const brand_uuid = brand_manager?.company_uuid
    let company = undefined
    let legal_status = undefined
    let address = undefined
    let activities= undefined

    if (brand_uuid) {
      company = await Company.findOne({ where: { uuid: brand_uuid } });
    }

    if (company) {
      legal_status = await LegalStatus.findOne({ where: { uuid: company.legal_status_uuid } });
      address = await Address.findOne({ 
        where: { uuid: company.address_uuid },
        attributes: ['zip_code', 'city', 'address_title'], 
      });

      if (company?.activities) {
        let savedActivities: any = [];
        for (const activity of Object.keys(company?.activities)) {
          const activityByCode = await Activities.findOne({ where: { code: activity } });
          
          if (!!activityByCode) {
            await savedActivities.push(activityByCode);
          }
        }

        activities = await savedActivities
      }
    }

    if (!user) {
        return res.status(409).json({ detail: 'user-not-exist' });
    }

    const userData = {
      "manager": user,
      "company": {
        "uuid": company?.uuid,
        "email_pro": company?.email_pro,
        "name": company?.name,
        "siret": company?.siret,
        "activities": activities,
        "address": address,
        "legal_status": legal_status
      }
    }

    return res.status(200).json(
        userData
    )

  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;