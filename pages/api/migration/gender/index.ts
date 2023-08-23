import { NextApiRequest, NextApiResponse } from 'next';
import gender from "../../sets/gender.json"
import db from '../../db';
import { Gender } from '../../models/gender';

const adminKey = process.env.MIGRATION_ADMIN_KEY

/**
 * @swagger
 * /api/migration/gender:
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

      gender.map(async (gender: any, idx: any) => {
        const genderByCode = await Gender.findOne({ where: { code: gender.code } });
        if(genderByCode){
            await db.transaction(async (transaction: any) => {  
                await Gender.update({title_i18n: gender.title_i18n}, { where: { code: gender.code } })
              });
        }
        else{
            const newGender = await Gender.create({
              title_i18n: gender.title_i18n,
              code: gender.code
            })
            await db.transaction(async (transaction: any) => { 
                await newGender.save({ transaction });   
            });
        }
      })

      return res.status(200).json(
        { 
          message: 'gender_successful_migrate'
        }
        );
    
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'error_during_migration' });
    }
  }

  return res.status(405).json({ message: 'method_not_allowed' });

};