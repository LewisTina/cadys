import bcrypt from 'bcrypt';
import { UserRoles } from './models/user';
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const JWT_SECRET = process.env.TOKEN_SECRET_KEY;

export async function hashPassword(password: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error('Password hashing failed');
    }
  }
  
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      throw new Error('Password comparison failed');
    }
  }

export const TokenRequiredDependence = (res: any, token: string) => {

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = verifyToken(token)
    console.log(token, decodedToken)

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

}

export const TokenRequiredDependenceAdmin = async (res: any, token: string) => {
  
  const userRole = await UserRoles.findOne({ where: { code: "administrator" } });

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const decodedToken = verifyToken(token)

  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (decodedToken && userRole) {
    if(decodedToken.role != userRole.uuid){
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

}

export function generateToken(subject: any) {
    const payload = {
      id: subject.uuid,
      role: subject.role
    };
  
    /* const options = {
      expiresIn: '1h'
    }; */
  
    return jwt.sign(payload, JWT_SECRET);
  }
  
export function verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      console.log(error);
    }
  }