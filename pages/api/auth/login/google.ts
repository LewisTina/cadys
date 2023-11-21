import { NextApiRequest, NextApiResponse } from 'next';
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.GOOGLE_CLIENT_SECRET

/**
 * @swagger
 * /api/auth/login/google:
 *   post:
 *     summary: Login with google account
 *     description: Login user with google account
 *     tags: ["auth"]
 *     requestBody:
 *       description: Login user with google account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginWithGoogle'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type:
 *                string
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
  if (req.method === 'POST') {
    try {
      const  {access_token} = req.body;
      const decoded = jwt.verify(access_token, JWT_SECRET)

      console.log(access_token, JWT_SECRET)

      return res.status(500).json({googleData: decoded})
    
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'error_registering_user' });
    }
  }

  return res.status(405).json({ message: 'method_not_allowed' });
};

export default handler;