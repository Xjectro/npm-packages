import {
  DeleteObjectCommand,
  S3Client,
  S3ClientConfigType,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import mime from "mime-types";
import { v4 as uuidV4 } from "uuid";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import { PassThrough } from "stream";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

interface MediaUploadParams {
  attachment: { buffer: Buffer; originalname: string };
  childrenDirs?: string[];
}

interface ServiceParameters extends S3ClientConfigType {
  bucketName: string;
  cdnUrl: string;
}

class Delivery {
  public client: S3Client;
  public bucketName: string;
  private cdnUrl: string;

  constructor({
    region,
    endpoint,
    credentials,
    bucketName,
    cdnUrl,
  }: ServiceParameters) {
    this.client = new S3Client({
      region,
      endpoint,
      credentials,
    });
    this.bucketName = bucketName;
    this.cdnUrl = cdnUrl;
  }

  public async doesFileExist(key: string): Promise<boolean> {
    try {
      await this.client.send(
        new GetObjectCommand({ Bucket: this.bucketName, Key: key }),
      );
      return true;
    } catch (error: any) {
      return error?.name === "NoSuchKey" ? false : false;
    }
  }

  public async removeFile(key: string): Promise<boolean> {
    try {
      await this.client.send(
        new DeleteObjectCommand({ Bucket: this.bucketName, Key: key }),
      );
      return true;
    } catch {
      return false;
    }
  }

  public async persistFile({
    attachment,
    childrenDirs,
  }: MediaUploadParams): Promise<string | false> {
    const mimeType =
      mime.lookup(attachment.originalname) || "application/octet-broadcast";

    const baseDir =
      childrenDirs && childrenDirs.length > 0 ? childrenDirs.join("/") : "";
    const uniqueFilename = baseDir ? `${baseDir}/${uuidV4()}` : uuidV4();

    const url = await this.uploadToS3(attachment.buffer, {
      Key: uniqueFilename,
      mimeType,
    });

    if (!url) return false;

    return url;
  }

  public async retrieveFile(filePath: string, fileName: string): Promise<any> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: `${filePath}/${fileName}`,
      });
      const response = await this.client.send(command);
      return {
        Body: response.Body,
        ContentType: mime.lookup(fileName) || "application/octet-broadcast",
        ContentDisposition: "inline",
      };
    } catch (error) {
      return false;
    }
  }

  private async uploadToS3(
    buffer: Buffer,
    { Key, mimeType }: { Key: string; mimeType: string },
  ): Promise<string | false> {
    try {
      const upload = new Upload({
        client: this.client,
        params: {
          Bucket: this.bucketName,
          Key: Key,
          Body: buffer,
          ContentType: mimeType,
          ContentDisposition: "inline",
          ACL: "public-read",
        },
      });
      await upload.done();
      return `${this.cdnUrl}/${Key}`;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  extractMediaSegment({
    startTime,
    endTime,
    originalname,
    inputPath,
  }: {
    startTime: number;
    endTime: number;
    originalname: string;
    inputPath: string;
  }): Promise<Buffer> {
    if (endTime <= startTime) {
      return Promise.reject(
        new Error("End time must be greater than start time."),
      );
    }

    const segmentDuration = endTime - startTime;
    const format = path.extname(originalname).slice(1).toLowerCase() || "mp4";

    return new Promise<Buffer>((resolve, reject) => {
      const outputStream = new PassThrough();
      const chunks: Buffer[] = [];

      outputStream.on("data", (chunk) => {
        chunks.push(chunk);
      });

      outputStream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });

      outputStream.on("error", (err) => {
        console.error("Stream Error:", err);
        reject(
          new Error(
            "Failed to process media stream during segment extraction.",
          ),
        );
      });

      ffmpeg(inputPath)
        .setStartTime(startTime)
        .setDuration(segmentDuration)
        .outputFormat(format)
        .on("error", (err, stdout, stderr) => {
          console.error(
            "FFmpeg Error during media segment extraction:",
            err.message,
          );
          if (stdout) console.error("FFmpeg stdout:", stdout);
          if (stderr) console.error("FFmpeg stderr:", stderr);
          if (!outputStream.destroyed) {
            outputStream.destroy(
              err instanceof Error ? err : new Error(String(err)),
            );
          }
          reject(
            new Error("Media segment extraction failed due to FFmpeg error."),
          );
        })
        .pipe(outputStream, { end: true });
    });
  }
}

export { type MediaUploadParams, type ServiceParameters, Delivery };
export default Delivery;
