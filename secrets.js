// ES5 example
const R = require("ramda");
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

// a client can be shared by different commands.
const client = new SecretsManagerClient({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const command = new GetSecretValueCommand({
  SecretId:
    "arn:aws:secretsmanager:ap-southeast-1:466074327738:secret:test/my-parse-server-xpyKTG",
});

async function callSecretManagerTest() {
  console.log("Call To Api");
  const data = await client
    .send(command)
    .then(R.prop("SecretString"))
    .then(JSON.parse);
  return data;
}

module.exports = { callSecretManagerTest };
