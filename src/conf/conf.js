const conf = {
  appwirteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwirteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwirteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwirteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwirteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
