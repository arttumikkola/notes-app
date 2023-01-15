const AWS = require("aws-sdk");
const secretsManager = new AWS.SecretsManager();

require("dotenv").config();

const getRDSCredentials = async () => {
  try {
    const secretName = process.env.SECRET_NAME;
    const secretValue = await secretsManager
      .getSecretValue({ SecretId: secretName })
      .promise();
    const { username, password } = JSON.parse(secretValue.SecretString);
    return {
      host: "notes-db.co8qqnhkzpn5.eu-north-1.rds.amazonaws.com",
      user: username,
      password: password,
      database: "notes-db",
      connectionLimit: 5,
    };
  } catch (err) {
    console.error("Error getting RDS credentials from Secrets Manager: ", err);
    throw err;
  }
};
