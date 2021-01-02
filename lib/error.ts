import { ImageSource } from "types/image-meta";

export class ApiError extends Error {
  constructor(api: ImageSource) {
    const message = `Error when fetching images from the ${api} API.`;
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
