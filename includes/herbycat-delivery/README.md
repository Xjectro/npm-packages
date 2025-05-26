# @herbycat/delivery 🚚💨

`@herbycat/delivery` is a powerful TypeScript library for uploading, managing, and accessing media files for S3-compatible storage services. It's designed to work with AWS S3, Minio, or other S3-compatible storage solutions.

## Features ✨

- 📁 File upload and storage
- 🗑️ File deletion
- 🔍 File existence checking
- 📥 File retrieval
- 🎬 Video segment extraction (using FFmpeg)
- 🔄 CDN URL integration

## Installation 💻

```bash
# With npm
npm install @herbycat/delivery

# With pnpm
pnpm add @herbycat/delivery

# With yarn
yarn add @herbycat/delivery
```

## Usage 🚀

### Getting Started

```typescript
import { Delivery } from "@herbycat/delivery";

// Create a service instance
const deliveryService = new Delivery({
  region: "your-region",
  endpoint: "your-endpoint", // Custom S3 endpoint (MinIO, DigitalOcean Spaces, etc.)
  credentials: {
    accessKeyId: "your-access-key",
    secretAccessKey: "your-secret-key",
  },
  bucketName: "your-bucket-name",
  cdnUrl: "your-cdn-url",
});
```

### File Upload

```typescript
// Upload a file
const fileBuffer = Buffer.from("file content");
const uploadResult = await deliveryService.persistFile({
  attachment: {
    buffer: fileBuffer,
    originalname: "example.jpg",
  },
  childrenDirs: ["uploads", "images"], // optional subdirectories
});

if (uploadResult) {
  console.log("File uploaded successfully:", uploadResult);
} else {
  console.error("An error occurred while uploading the file.");
}
```

### File Deletion

```typescript
const isDeleted = await deliveryService.removeFile("uploads/images/file-key");
if (isDeleted) {
  console.log("File deleted successfully.");
} else {
  console.error("An error occurred while deleting the file.");
}
```

### Check File Existence

```typescript
const exists = await deliveryService.doesFileExist("uploads/images/file-key");
console.log("Does the file exist?", exists);
```

### File Retrieval

```typescript
const file = await deliveryService.retrieveFile("uploads/images", "file-key");
if (file) {
  // File operations
  const { Body, ContentType, ContentDisposition } = file;
} else {
  console.error("File not found.");
}
```

### Video Segment Extraction

```typescript
try {
  const videoSegment = await deliveryService.extractMediaSegment({
    startTime: 10, // start time in seconds
    endTime: 20, // end time in seconds
    originalname: "video.mp4",
    inputPath: "/path/to/video.mp4",
  });

  // Upload the extracted segment
  const uploadResult = await deliveryService.persistFile({
    attachment: {
      buffer: videoSegment,
      originalname: "segment.mp4",
    },
    childrenDirs: ["uploads", "videos", "segments"],
  });

  console.log(
    "Video segment successfully extracted and uploaded:",
    uploadResult,
  );
} catch (error) {
  console.error("An error occurred while extracting the video segment:", error);
}
```

## Examples 📋

### Profile Picture Upload

```typescript
async function uploadProfilePicture(
  userId: string,
  imageBuffer: Buffer,
  filename: string,
) {
  const uploadResult = await deliveryService.persistFile({
    attachment: {
      buffer: imageBuffer,
      originalname: filename,
    },
    childrenDirs: ["users", userId, "profile"],
  });

  return uploadResult;
}
```

### Organizing Media Files into Collections

```typescript
async function organizeMediaFiles(
  collectionId: string,
  mediaFiles: Array<{ buffer: Buffer; filename: string }>,
) {
  const uploadPromises = mediaFiles.map((file) =>
    deliveryService.persistFile({
      attachment: {
        buffer: file.buffer,
        originalname: file.filename,
      },
      childrenDirs: ["collections", collectionId],
    }),
  );

  const results = await Promise.all(uploadPromises);
  return results.filter(Boolean); // Filter successful uploads
}
```
