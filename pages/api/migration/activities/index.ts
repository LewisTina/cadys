import { NextApiRequest, NextApiResponse } from 'next';
import activities from "../../sets/activites.json"
import { Activities } from '../../models/activites';
import { v4 as uuidV4 } from 'uuid';
import db from '../../db';

const adminKey = process.env.MIGRATION_ADMIN_KEY

/**
 * @swagger
 * /api/migration/activities:
 *   post:
 *     summary: Login user
 *     description: Sign in with email and password
 *     tags: ["migrations"]
 *     requestBody:
 *       description: Login user with email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/migration'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorize
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
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
      const  {key} = req.body;

      if (key) {
        if (key != adminKey) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
      }

      activities.map(async (activity: any, idx: any) => {
        const activityByCode = await Activities.findOne({ where: { code: activity.code } });
        if(activityByCode){
            await db.transaction(async (transaction: any) => {  
                await Activities.update({title_i18n: activity.title_i18n}, { where: { code: activity.code } })
              });
        }
        else{
            const newActivity = await Activities.create({
              uuid: uuidV4(),
              title_i18n: activity.title_i18n,
              code: activity.code
            })
            await db.transaction(async (transaction: any) => { 
                await newActivity.save({ transaction });   
              });
        }
      })

      return res.status(200).json(
        { 
          message: 'activities_successful_migrate'
        }
        );
    
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'error_during_migration' });
    }
  }

  return res.status(405).json({ message: 'method_not_allowed' });

};