import { config } from "../config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

const {
  APPWRITE_API_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_COLLECTION_ID,
  APPWRITE_BUCKET_ID,
} = config;

export class StorageService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(APPWRITE_API_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        slug
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAllPosts() {
    try {
      return await this.databases.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        [Query.equal("status", "active")]
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  //   File upload services
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(APPWRITE_BUCKET_ID, fileId);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      return await this.storage.getFilePreview(APPWRITE_BUCKET_ID, fileId);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
