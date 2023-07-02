

interface Config{
    jwtSecret: string;
    spaceAccessKeyId: string;
    spaceSecretAccessKey: string;
    spaceEndpoint:string
}

export const config: Config = {
  jwtSecret: process.env.JWT_SECRET || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY || "",
  spaceEndpoint: process.env.SPACE_ENDPOINT || "",
};