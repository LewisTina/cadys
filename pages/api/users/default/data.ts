import { NextApiRequest, NextApiResponse } from 'next';
import { LegalStatus } from '../../models/company';
import { Activities } from '../../models/activites';
import { UserRoles } from '../../models/user';
import { MissionState } from '../../models/mission';
import db from '../../db';
import { Gender } from '../../models/gender';

/**
 * @swagger
 * /api/users/default/data:
 *   get:
 *     summary: Get Default data form.
 *     description: Default data form.
 *     security:
 *       - TokenRequired: []
 *     tags: ["users"]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *             type:
 *               string
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
 *       500:
 *         description: Internal server error
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    let legal_status = await LegalStatus.findAll()
    let activities = await Activities.findAll()
    let roles = await UserRoles.findAll()
    let gender = await Gender.findAll()
    let assignment_state: any = []

    await db.query("SELECT enum_range(NULL::assignment_state);").then((result: any) => {
      assignment_state = result[0][0]['enum_range']
    }).catch((error: any) => {
      console.error(error);
    });

    return res.status(200).json(
      {
        legal_status,
        activities,
        roles,
        gender,
        assignment_state,
      }
    )

  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;