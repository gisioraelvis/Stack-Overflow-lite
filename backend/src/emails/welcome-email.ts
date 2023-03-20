import { IUser } from "../interfaces/user.interface";
import { DatabaseUtils } from "../utils/db.util";
import { sendEmail } from "../utils/email.util";
import dotenv from "dotenv";
import { CreateLog } from "../utils/logger.util";
dotenv.config({ path: __dirname + "/../../.env" });

const dbUtils = new DatabaseUtils();

//send welcome email to newly registered customers i.e in the last 10 seconds
export const sendWelcomeEmail = async () => {
  try {
    const result = await dbUtils.query(
      `SELECT * FROM users WHERE createdAt >= DATEADD(second, -10, GETDATE())`
    );
    if (result.recordset.length > 0) {
      //   CreateLog.info(
      //     `Sending welcome email to ${result.recordset.length} new users`
      //   );
      const newUsers = result.recordset as IUser[];
      newUsers.forEach((user) => {
        const subject = "Welcome to StackOverflow Lite";
        const html = `<h1>Welcome to StackOverflow Lite</h1>
            <p>Dear ${user.name},</p>
            <p>Thank you for registering.</p>
            <P>We are happy to have you in the community 🎉</P>
            <P>
              You can now:
              <ul>
                <li>Ask questions</li>
                <li>Answer questions</li>
                <li>Comment on questions and answers</li>
                <li>Vote on questions and answers</li>
              </ul>
            </P>
            <P>
              <a href=${process.env.CLIENT_URL}>
                Click here to visit StackOverflow Lite
              </a> 
            </P>
            <p>Regards,<br/>StackOverflow Lite Team</p>`;

        sendEmail(subject, user.email, html);
      });
    }
  } catch (error) {
    CreateLog.error(error);
  }
};
