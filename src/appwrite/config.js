import conf from "../conf/conf";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwirteUrl)
      .setProject(conf.appwirteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwirteDatabaseID,
        conf.appwirteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("create post error", error);
    }
  }

  async updatePost(slug, { title, content, status, featuredImage }) {
    try {
      return await this.databases.updateDocument(
        conf.appwirteDatabaseID,
        conf.appwirteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("update post error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwirteDatabaseID,
        conf.appwirteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("delete post error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwirteDatabaseID,
        conf.appwirteCollectionId,
        slug
      );
    } catch (error) {
      console.log("getPost error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwirteDatabaseID,
        conf.appwirteCollectionId,
        queries
      );
    } catch (error) {
      console.log("List Active post error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwirteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("file upload error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.getFile(conf.appwirteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("get file error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwirteBucketId, fileId);
  }

  downloadFile(fileId) {
    return this.bucket.downloadFile(conf.appwirteBucketId, fileId);
  }
}

const service = new Service();

export default service;
