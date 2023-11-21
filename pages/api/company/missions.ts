import { NextApiRequest, NextApiResponse } from 'next';
import { TokenRequiredDependence, verifyToken } from '../security';
import Mission, { MissionState } from '../models/mission';
import { v4 as uuidV4 } from 'uuid';
import { Client } from '../models/client';
import Address from '../models/address';
import Mailer from '../mailer';
import { UserRoles } from '../models/user';
import moment from 'moment';
import { Manager } from '../models/company';
import { Activities } from '../models/activites';

/**
 * @swagger
 * /api/company/missions:
 *   get:
 *     summary: Get all missions assigned to a company
 *     description: Get all missions assigned to a company
 *     security:
 *       - TokenRequired: []
 *     parameters:
 *       - in: query
 *         name: state
 *         required: false
 *         schema:
 *           type: string
 *     tags: ["company"]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Listing'
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
  if (req.method === 'GET') {
    const {state} = req.query
    const token = req.headers.authorization?.split(' ')[1] as string;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const decodedToken = verifyToken(token)
  
    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const user = decodedToken.id
    const manager = await Manager.findOne({where: {manager_uuid : user}})

    if (!manager) {
      return res.status(404).json({ message: 'not_found_company' });
    }

    let result = undefined
    let formattedResult: any = []
  
    if (!state) {
      result = await Mission.findAll({
        order: [['updatedAt', 'DESC']],
        attributes: ['uuid','intervention_date_start', 'intervention_date_end', 'state', 'activities', 'intervention_address'],
        where: {
          brand_uuid: manager.company_uuid
        }
      });
    }

    else {
      result = await Mission.findAll({
        order: [['updatedAt', 'DESC']],
        attributes: ['uuid','intervention_date_start', 'intervention_date_end', 'state', 'activities', 'intervention_address'],
        where: {
          brand_uuid: manager.company_uuid,
          state: state
        }
      });
    }

    if (!!result) {
      for(const line of result) {
        const activities = line.activities
        let formattedActivities: any = []
        const address = await Address.findOne({ 
          where: { uuid: line.intervention_address },
          attributes: ['zip_code', 'city', 'address_title'], 
        });

        if(!!activities){
          for(const option of activities) {
            if(option){
              const activityByUuid = await Activities.findOne({ 
                where: { uuid: option } 
              });
  
              if(!!activityByUuid) {
                await formattedActivities.push(activityByUuid)
              }
            }
          }
        }

        await formattedResult.push(
          {
            uuid: line.uuid,
            intervention_date_start: line.intervention_date_start,
            intervention_date_end: line.intervention_date_end,
            state: line.state,
            activities: formattedActivities,
            intervention_address: address
          })
    }}
    

    return res.status(200).json(formattedResult)

  }

  return res.status(405).json({ message: 'method_not_allowed' });

};

export default handler;