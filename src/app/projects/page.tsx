"use client";

import Add from "@/components/add/add";
import Tables from "@/components/pageTable";
import style from "./index.module.css";

const Projects = () => {
    return (
        <div className={style.wrapper}>
            <Add name="Проекты" keys="projects" />
            <Tables />
        </div>
    );
};

export default Projects;
