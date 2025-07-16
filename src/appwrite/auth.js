import config from "../config/config";
import { Account, Client, ID } from "appwrite";

const { APPWRITE_API_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_DEV_KEY } = config;
class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(APPWRITE_API_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.userLogin({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async userLogin({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw new Error(error);
    }
  }

  async userAuthenticated() {
    try {
      const isLoggedIn = await this.account.get();
      if (isLoggedIn) {
        return isLoggedIn;
      } else {
        throw new Error("User not exist.");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async userLogout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw new Error(error);
    }
  }
}

const authService = new AuthService();

export default authService;
