import * as request from "request-promise";
import { CookieJar } from "request";

export class TestClient {
  url: string;
  options: {
    json: boolean;
    jar: CookieJar;
    withCredentials: boolean;
  };

  constructor(url: string) {
    this.url = url;
    this.options = {
      json: true,
      jar: request.jar(),
      withCredentials: true
    };
  }

  async register(email: string, password: string) {
    return request.post(this.url, {
      ...this.options,
      body: {
        query: `
            mutation {
                register(email: "${email}", password: "${password}") {
                    path
                    message
                }
            }
        `
      }
    });
  }

  async login(email: string, password: string) {
    return request.post(this.url, {
      ...this.options,
      body: {
        query: `
            mutation {
                login(email: "${email}", password: "${password}") {
                    path
                    message
                }
            }
        `
      }
    });
  }

  async me() {
    return request.post(this.url, {
      ...this.options,
      body: {
        query: `
            {
                me {
                    id
                    email
                }
            }
        `
      }
    });
  }

  async logout() {
    return request.post(this.url, {
      ...this.options,
      body: {
        query: `
            mutation {
                logout
            }
        `
      }
    });
  }

  async forgotPasswordChange(newPassword: string, key: string) {
    return request.post(this.url, {
      ...this.options,
      body: {
        query: `
            mutation {
                forgotPasswordChange(newPassword: "${newPassword}", key: "${key}") {
                    path
                    message
                }
            }
        `
      }
    });
  }
}
