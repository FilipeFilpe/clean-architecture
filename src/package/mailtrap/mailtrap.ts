import { MailtrapClient } from "mailtrap";

const token = process.env.MAILTRAP_TOKEN || "";

const testInboxId = 3448813;
export const mailtTrap = new MailtrapClient({ token, testInboxId });
