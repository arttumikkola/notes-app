import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import dotenv from "dotenv";

getRDSCredentials = async () => {
  dotenv.config();

  const secret_name = process.env.SECRET_NAME;

  try {
    const client = new SecretsManagerClient({
      region: "eu-north-1",
    });
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT",
      })
    );
    const { password } = JSON.parse(response.SecretString);
    return {
      host: "notes-db.co8qqnhkzpn5.eu-north-1.rds.amazonaws.com",
      user: "admin",
      password: password,
      database: "notes-db",
      connectionLimit: 5,
    };
  } catch (err) {
    console.error("Error fetching secret: ", err);
    throw err;
  }
};
export default getRDSCredentials;
