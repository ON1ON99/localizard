class Backend {
    private token: string = "";
    private baseURL: string = "https://0t18bjmv-7283.euw.devtunnels.ms";

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
            const response = await fetch(`${this.baseURL}/api/Auth/Login`, {
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
            const response = await fetch(`${this.baseURL}/api/Auth/Register`, {
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
                `${this.baseURL}/api/User/GetAllUsers?page=${pageNumber}`,
                {
                    method: "GET",
                    headers,
                    redirect: "follow",
                },
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
            const response = await fetch(`${this.baseURL}/api/User/GetById/${id}`, {
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
            const response = await fetch(`${this.baseURL}/api/User/CreateUser`, {
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
            const response = await fetch(`${this.baseURL}/api/User/UpdateUser?userId=${id}`, {
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
            const response = await fetch(`${this.baseURL}/api/User/DeleteUser?userId=${id}`, {
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
                `${this.baseURL}/api/Project/GetAllProjects?currentPage=${pageNumber}`,
                {
                    method: "GET",
                    headers,
                    redirect: "follow",
                },
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
            const response = await fetch(`${this.baseURL}/api/Project/GetById/${id}`, {
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
            const response = await fetch(`${this.baseURL}/api/Project/CreateProject`, {
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
            const response = await fetch(`${this.baseURL}/api/Project/UpdateProject/${id}`, {
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

    async deleteProject(id: string) {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${this.token}`);

        try {
            const response = await fetch(`${this.baseURL}/api/Project/DeleteProject/${id}`, {
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

    // Translation

    async getTranslations(parentId: string, search: string) {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${this.token}`);

        try {
            const response = await fetch(
                `${this.baseURL}/api/ProjectDetail/GetAllProjectDetails?parentId=${parentId}&search=${search}`,
                {
                    method: "GET",
                    headers,
                    redirect: "follow",
                },
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
            const response = await fetch(`${this.baseURL}/api/ProjectDetail/GetProjectDetailById/${id}`, {
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
            const response = await fetch(`${this.baseURL}/api/ProjectDetail/CreateProjectDetail`, {
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
            const response = await fetch(`${this.baseURL}/api/ProjectDetail/UpdateProjectDetail/${id}`, {
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
            const response = await fetch(`${this.baseURL}/api/ProjectDetail/DeleteProjectDetail/${id}`, {
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

    // Languages

    async languages() {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${this.token}`);

        try {
            const response = await fetch(`${this.baseURL}/api/Language/GetAllLanguages`, {
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
            const response = await fetch(`${this.baseURL}/api/Language/GetLanguageById/:${id}`, {
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
            const response = await fetch(`${this.baseURL}/api/Language/CreateLanguage`, {
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
            const response = await fetch(`${this.baseURL}/api/Language/UpdateLanguage/${id}`, {
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
            const response = await fetch(`${this.baseURL}/api/Language/DeleteLanguage/${id}`, {
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
