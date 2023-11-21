import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../security';
import Mission from '../models/mission';
import { UserRoles } from '../models/user';

/**
 * @swagger
 * /api/mission/delete-mission:
 *   delete:
 *     summary: delete a mission
 *     description: delete a mission
 *     security:
 *       - TokenRequired: []
 *     parameters:
 *       - in: query
 *         name: uuid
 *         schema:
 *           type: string
 *         required:
 *            true
 *     tags: ["mission"]
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
 if (req.method === 'DELETE') {
    const {uuid} = req.query
    const token = req.headers.authorization?.split(' ')[1] as string;
    const userRole = await UserRoles.findOne({ where: { code: "administrator" } });

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

    await Mission.update({is_delete: true}, {where: {uuid: uuid }})

    return res.status(200).json(
      {
        message: "successful_state_update"
      }
    )

  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;