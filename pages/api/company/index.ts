import { NextApiRequest, NextApiResponse } from 'next';
import { TokenRequiredDependence, verifyToken } from '../security';
import { Company, Manager } from '../models/company';
import { filterNonNullFields } from '@/src/utils/helper';

/**
 * @swagger
 * /api/company:
 *   put:
 *     summary: Update company data
 *     description: Update company data
 *     security:
 *       - TokenRequired: []
 *     tags: ["company"]
 *     requestBody:
 *       description: brand registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BrandUpdate'
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

    const manager = await Manager.findOne({ where: { manager_uuid: user_uuid } });
    if (!manager) {
        return res.status(404).json({ detail: 'user_email_conflict' });
      }

    const cleanData = filterNonNullFields(baseData)

    await Company.update(cleanData, { where: { uuid: manager.company_uuid } });

    return res.status(200).json({ message: 'company_update_successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'error_updating_user' });
    }

  }


  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;