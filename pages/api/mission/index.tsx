import { NextApiRequest, NextApiResponse } from 'next';
import { TokenRequiredDependence, verifyToken } from '../security';
import Mission, { MissionState } from '../models/mission';
import { v4 as uuidV4 } from 'uuid';
import { Client } from '../models/client';
import Address from '../models/address';
import Mailer from '../mailer';
import { UserRoles } from '../models/user';

/**
 * @swagger
 * /api/mission/:
 *   get:
 *     summary: Get all missions
 *     description: Get all missions assigned to a company
 *     security:
 *       - TokenRequired: []
 *     tags: ["mission"]
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

/**
 * @swagger
 * /api/mission/:
 *   post:
 *     summary: create a mission
 *     description: create a mission
 *     tags: ["mission"]
 *     requestBody:
 *       description: Login user with email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequestQuotation'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Created'
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

/**
 * @swagger
 * /api/mission/:
 *   put:
 *     summary: update a mission
 *     description: update a mission
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
 *     requestBody:
 *       description: Login user with email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequestQuotation'
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

/**
 * @swagger
 * /api/mission:
 *   get:
 *     summary: Get mission by uuid
 *     description: Get mission by uuid
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
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
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

    let result = undefined
  
    if (!uuid) {
      if (userRole) {
        if(decodedToken.role != userRole.uuid){
          return res.status(401).json({ message: 'Unauthorized' });
        }

        else {
          result = await Mission.findAll();
        }
      }
    }

    else {
      result = await Mission.findOne({ where: { uuid: uuid } });
    }
    

    return res.status(200).json(
      {
        result
      }
    )

  }

  else if (req.method === 'POST') {
    const baseData = req.body

    let client = undefined

    const GetClientByEmail = await Client.findOne({ where: { email: baseData.email } });

    if (!GetClientByEmail) {
      client = await Client.create({
        uuid: uuidV4(),
        email: baseData.email
      })
    }

    else {
      client = GetClientByEmail
    }

    const client_address = await Address.create({
      uuid: uuidV4(),
      zip_code: baseData.address.zip_code || '',
      city: baseData.address.city || '',
      address_title: baseData.address.address_title || '',
      client_uuid: client.uuid || '',
    })

    const assignment = await Mission.create({
      uuid: uuidV4(),
      request_date: new Date(Date.now()),
      client_uuid: client.uuid,
      remark: baseData.remark || '',
      state: MissionState.PENDING,
      intervention_address: client_address.uuid,
      activities: baseData.activities,
      is_urgent: baseData.is_urgent,
      intervention_date_start: baseData.start_date,
      intervention_date_end: baseData.end_date,
    });
    
    const mailData = {
      email : baseData.email,
      subject: "Cadys | Confirmation de requête",
      content:{
        zip_code: baseData.address.zip_code || '',
        city: baseData.address.city || '',
        address_title: baseData.address.address_title || '',
        activities: baseData.activities,
        is_urgent: baseData.is_urgent,
        intervention_date_start: baseData.start_date,
        intervention_date_end: baseData.end_date,
      },
      template: "requestConfirmation"
    }

    await Mailer(mailData);


    return res.status(200).json(
      {
        "message": "successfully_request_send",
        "uuid": assignment.uuid
      }
    )

  }

  else if (req.method === 'PUT') {
    const token = req.headers.authorization?.split(' ')[1] as string;
    await TokenRequiredDependence(res, token)


    return res.status(200).json(
      {
      }
    )

  }

  return res.status(405).json({ message: 'method_not_allowed' });

};

export default handler;