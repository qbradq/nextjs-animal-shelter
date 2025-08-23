import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

let cachedS3Client: S3Client | null = null;

function s3Client(): S3Client {
  if (!cachedS3Client) {
    cachedS3Client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESSKEYID!,
        secretAccessKey: process.env.AWS_SECRETACCESSKEY!,
      },
    });
  }
  return cachedS3Client;
}

export async function s3Image(uuid: string, buf: Buffer) {
  const client = s3Client();
  const command = new PutObjectCommand({
    Bucket: "animal-shelter-image",
    Key: uuid + ".jpg",
    Body: buf,
  });
  await client.send(command);
}
