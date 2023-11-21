import { NextApiRequest, NextApiResponse } from 'next';
import { Op } from 'sequelize'; 
import UserPreRegister from '../../models/user_preregister';
import { User, UserStatusType } from '../../models/user';

/**
 * @swagger
 * /api/auth/register/validation-step:
 *   put:
 *     summary: Email validation step for creating a customer account
 *     description: Email validation step for creating a customer account
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     tags: ["auth"]
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
  if (req.method === 'PUT') {
    try {  
      const { code } = req.query;

      const userCode = await UserPreRegister.findOne({
        where: {
          code: code,
          expired_date: { [Op.gte]: new Date() }
        }
      });

      if (!userCode) {
        return res.status(404).json({ detail: 'code_invalid_or_expired' });
      }

      const user = await User.findOne({ where: { uuid: userCode.user_uuid } });
      if (!user) {
        return res.status(404).json({ detail: 'user_not_exist' });
      }

      await User.update({status: UserStatusType.ACTIVATED}, {where: {uuid: userCode.user_uuid}})

      return res.status(200).json(
        { 
          message: 'email_successful_verified',
          user_uuid: user.uuid
        });
    }

    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'internal_server_error' });
    }
  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;