import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../security';
import Mission from '../models/mission';
import { Manager } from '../models/company';
import { UserRoles } from '../models/user';

/**
 * @swagger
 * /api/mission/accept-mission:
 *   put:
 *     summary: accept or decline a mission
 *     description: accept or decline a mission
 *     security:
 *       - TokenRequired: []
 *     tags: ["mission"]
 *     requestBody:
 *       description: Login user with email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AcceptOrDeclineMission'
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
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
 if (req.method === 'PUT') {
    const {mission_uuid, accept} = req.body
    const token = req.headers.authorization?.split(' ')[1] as string;
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const decodedToken = verifyToken(token)
  
    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const manager = decodedToken.id
    const company = await Manager.findOne({where: {manager_uuid : manager}})

    if (!company) {
      return res.status(404).json({ message: 'not_found_company' });
    }

    const mission = await Mission.findOne({where: {uuid: mission_uuid}})

    if (!mission){
      return res.status(404).json({message: 'mission_not_exist'})
    }

    if (company.uuid != mission.brand_uuid) {
      return res.status(403).json({message: 'you_not_allow_to_accept_this_mission'})
    }

    if (!accept) {
      await Mission.update({state: 'REJECTED', brand_uuid: null}, {where: {uuid: mission_uuid }})
    }

    await Mission.update({state: 'IN_PROGRESS'}, {where: {uuid: mission_uuid }})

    return res.status(200).json(
      {
        message: "successful_state_update"
      }
    )

  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;