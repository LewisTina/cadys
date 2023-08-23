import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../security';
import Mission from '../models/mission';

/**
 * @swagger
 * /api/mission/change-state:
 *   put:
 *     summary: Change mission state
 *     description: change mission state
 *     security:
 *       - TokenRequired: []
 *     tags: ["mission"]
 *     requestBody:
 *       description: Login user with email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangeMissionState'
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
    const {uuid, state} = req.body
    const token = req.headers.authorization?.split(' ')[1] as string;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const decodedToken = verifyToken(token)
  
    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const mission = await Mission.findOne({where: {uuid: uuid}})

    if (!mission){
      return res.status(404).json({message: 'mission_not_exist'})
    }

    await Mission.update({state: state}, {where: {uuid: uuid }})

    return res.status(200).json(
      {
        message: "successful_state_update"
      }
    )

  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;