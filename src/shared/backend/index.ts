class Backend {
  private token: string = "";
  private baseURL: string = "https://0t18bjmv-7118.euw.devtunnels.ms/api";

  constructor() {
    if (typeof window !== "undefined") {
      this.token = window.localStorage.getItem("token") || "";
    }
  }

  //Login

  async login(username: string, password: string) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${this.baseURL}/Auth/login`, {
        method: "POST",
        headers,
        redirect: "follow",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (response.status > 299) throw new Error(response.statusText);
      const data = await response.json();
      this.token = data.token;

      if (typeof window !== "undefined") {
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("role", data.role);
      }
    } catch {
      return {};
    }
  }

  async register(username: string, password: string, role: string) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${this.baseURL}/Auth/register`, {
        method: "POST",
        headers,
        redirect: "follow",
        body: JSON.stringify({
          username: username,
          password: password,
          role: role,
        }),
      });
      if (response.status > 299) throw new Error(response.statusText);
      const data = await response.json();
      this.token = data.token;
    } catch {
      return {};
    }
  }

  // Users

  async users(pageNumber: number) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    try {
      const response = await fetch(
        `${this.baseURL}/Auth?pageNumber=${pageNumber}`,
        {
          method: "GET",
          headers,
          redirect: "follow",
        }
      );
      if (response.status > 299) throw new Error(response.statusText);
      const data = await response.json();

      return data;
    } catch (e) {
      console.log("catch", e);

      return [];
    }
  }

  async user(id: string) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    try {
      const response = await fetch(`${this.baseURL}/Auth/${id}`, {
        method: "GET",
        headers,
        redirect: "follow",
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  async addUser(data: any) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${this.baseURL}/Auth`, {
        method: "POST",
        headers,
        redirect: "follow",
        body: JSON.stringify(data),
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  async updateUser(id: any, data: any) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${this.baseURL}/Auth?userId=${id}`, {
        method: "PUT",
        headers,
        redirect: "follow",
        body: JSON.stringify(data),
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  async deleteUser(id: string) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    try {
      const response = await fetch(`${this.baseURL}/Auth?userId=${id}`, {
        method: "DELETE",
        headers,
        redirect: "follow",
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  // Projects

  async projects(pageNumber: number) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    try {
      const response = await fetch(
        `${this.baseURL}/Project/GetAll?pageNumber=${pageNumber}`,
        {
          method: "GET",
          headers,
          redirect: "follow",
        }
      );
      if (response.status > 299) throw new Error(response.statusText);
      const data = await response.json();

      return data;
    } catch (e) {
      console.log("catch", e);

      return [];
    }
  }

  async project(id: string) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    try {
      const response = await fetch(`${this.baseURL}/Project/${id}`, {
        method: "GET",
        headers,
        redirect: "follow",
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  async addProject(data: any) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${this.baseURL}/Project/create`, {
        method: "POST",
        headers,
        redirect: "follow",
        body: JSON.stringify(data),
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }
  async updateProject(id: any, data: any) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${this.baseURL}/Project/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify(data),
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  async deleteProject(id: string) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    try {
      const response = await fetch(`${this.baseURL}/Project/${id}`, {
        method: "DELETE",
        headers,
        redirect: "follow",
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  //? Translation

  async getTranslations(parentId: string, search: string) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    try {
      const response = await fetch(
        `${this.baseURL}/Product?search=${search}&parentId=${parentId}`,
        {
          method: "GET",
          headers,
          redirect: "follow",
        }
      );
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  async translation(id: string) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    try {
      const response = await fetch(`${this.baseURL}/Product/${id}`, {
        method: "GET",
        headers,
        redirect: "follow",
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  async addTranslation(data: any) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${this.baseURL}/Product`, {
        method: "POST",
        headers,
        redirect: "follow",
        body: JSON.stringify(data),
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  async updateTranslation(id: any, data: any) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${this.baseURL}/Product/${id}`, {
        method: "PUT",
        headers,
        redirect: "follow",
        body: JSON.stringify(data),
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  async deleteTranslation(id: string) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    try {
      const response = await fetch(`${this.baseURL}/Product/${id}`, {
        method: "DELETE",
        headers,
        redirect: "follow",
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  //? Languages

  async languages() {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    try {
      const response = await fetch(`${this.baseURL}/Language`, {
        method: "GET",
        headers,
        redirect: "follow",
      });
      if (response.status > 299) throw new Error(response.statusText);
      const data = await response.json();

      return data;
    } catch (e) {
      console.log("catch", e);

      return [];
    }
  }

  async language(id: string) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    try {
      const response = await fetch(`${this.baseURL}/Language/${id}`, {
        method: "GET",
        headers,
        redirect: "follow",
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  async addLanguage(data: any) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${this.baseURL}/Language`, {
        method: "POST",
        headers,
        redirect: "follow",
        body: JSON.stringify(data),
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  async updateLanguage(id: any, data: any) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${this.baseURL}/Language/${id}`, {
        method: "PUT",
        headers,
        redirect: "follow",
        body: JSON.stringify(data),
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  async deleteLanguage(id: string) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    try {
      const response = await fetch(`${this.baseURL}/Language/${id}`, {
        method: "DELETE",
        headers,
        redirect: "follow",
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return {};
    }
  }

  // Tags

  async tags() {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);

    try {
      const response = await fetch(`${this.baseURL}/Tags/tags`, {
        method: "GET",
        headers,
        redirect: "follow",
      });
      if (response.status > 299) throw new Error(response.statusText);
      return await response.json();
    } catch {
      return [];
    }
  }
}

export const backend = new Backend();

export default backend;
