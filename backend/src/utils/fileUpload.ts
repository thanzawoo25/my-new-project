
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "../config/config";

//set s3 endpoint and digitalocean space

const s3Config = new S3Client({
    endpoint: config.spaceEndpoint,
    region: "sgp1",
    credentials: {
        accessKeyId: config.spaceAccessKeyId,
        secretAccessKey:config.spaceSecretAccessKey,
    }
})

//change bucket property to your space name

export const fileUpload = multer({
    storage: multerS3({
        s3: s3Config,
        bucket: "msquarefdc",
        acl: "public-read",
        key: function (request, file, cb) {
            cb(null, `happy-pos/msquare/${Date.now()}_${file.originalname}`);
        }
    })
}).array("file",1)