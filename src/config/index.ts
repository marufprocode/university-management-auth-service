import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5000,
  mongo_url: process.env.MONGO_URL as string,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS as string,
};
