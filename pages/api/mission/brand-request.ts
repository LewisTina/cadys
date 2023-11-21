import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../security';
import Mission from '../models/mission';
import { Company } from '../models/company';
import { UserRoles } from '../models/user';

/**
 * @swagger
 * /api/mission/brand-request:
 *   put:
 *     summary: Send offer to a brand admin
 *     description: Send offer to a brand admin
 *     security:
 *       - TokenRequired: []
 *     tags: ["mission"]
 *     requestBody:
 *       description: Send offer to a brand admin
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequestBrand'
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
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
 if (req.method === 'PUT') {
    const {mission_uuid, company_uuid} = req.body
    const token = req.headers.authorization?.split(' ')[1] as string;
    const userRole = await UserRoles.findOne({ where: { code: "administrator" } });
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const decodedToken = verifyToken(token)
  
    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (userRole) {
      if(decodedToken.role != userRole.uuid){
        return res.status(401).json({ message: 'Unauthorized' });
      }
    }

    const mission = await Mission.findOne({where: {uuid: mission_uuid}})
    const company = await Company.findOne({where: {uuid: company_uuid}})

    if (!mission){
      return res.status(404).json({message: 'mission_not_exist'})
    }

    if (!company){
      return res.status(404).json({message: 'company_not_exist'})
    }

    await Mission.update({brand_uuid: company_uuid}, {where: {uuid: mission_uuid }})

    return res.status(200).json(
      {
        message: "successful_state_update"
      }
    )

  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;