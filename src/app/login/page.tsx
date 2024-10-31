"use client";

import backend from "@/shared/backend";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/projects");
        }
    }, [router]);
    const onSubmit = (e: any) => {
        backend.login(username, password).then(() => {
            setTimeout(() => {
                router.push("/");
            }, 2000);
        }).catch((error) => {
            if (error.response.status === 401) {
                alert("Invalid username or password");
            }else if(error.response.status === 500){
                alert("Server error");
            }else if(error.response.status === 400){
                alert("Bad request");
            } else {
                alert("Something went wrong");
            }
        });
        e.preventDefault();
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <h1 className="mt-12 text-4xl font-semibold">Login</h1>

            <form className="flex flex-col w-1/4 gap-4 ">
                <label htmlFor="username" className="text-2xl">
                    Username
                </label>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-10 p-1 text-xl border-2 rounded-lg"
                    type="text"
                    id="username"
                    name="username"
                />

                <label htmlFor="password" className="text-2xl">
                    Password
                </label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 p-1 text-xl border-2 rounded-lg"
                    type="password"
                    id="password"
                    name="password"
                />
                <Button
                    onClick={onSubmit}
                    className="w-1/2 self-center text-2xl"
                    color="primary"
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export default Login;
