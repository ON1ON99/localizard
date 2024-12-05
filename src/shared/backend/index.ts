class Backend {
    private token: string = "";
    private baseURL: string = "https://widely-accurate-anteater.ngrok-free.app";

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
            const response = await fetch(`${this.baseURL}/api/auth/login`, {
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
            const response = await fetch(`${this.baseURL}/api/auth/register`, {
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
        } catch {
            return {};
        }
    }

    // Users

    async users(pageNumber: number) {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${this.token}`);
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(
                `${this.baseURL}/api/user/get-all?page=${pageNumber}`,
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
        headers.append("ngrok-skip-browser-warning", "69420")

        try {
            const response = await fetch(`${this.baseURL}/api/user/get-by/${id}`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/user/create-user`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/user/update?userId=${id}`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/user/delete?userId=${id}`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")

        try {
            const response = await fetch(
                `${this.baseURL}/api/project/get-all?currentPage=${pageNumber}`,
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/project/get-by/${id}`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/project/create`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/project/update/${id}`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/project/delete/${id}`, {
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

    async getTranslations(projectId: string, search: string) {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${this.token}`);
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(
                `${this.baseURL}/api/project-detail/get-all?projectId=${projectId}&Search=${search}`,
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/project-detail/get-by/${id}`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/project-detail/create`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/project-detail/update/${id}`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/project-detail/delete?id=${id}`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/language/get-all`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/language/get-by/${id}`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/language/create`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/language/update?id=${id}`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/language/delete/${id}`, {
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
        headers.append("ngrok-skip-browser-warning", "69420")


        try {
            const response = await fetch(`${this.baseURL}/api/tag/get-all`, {
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
