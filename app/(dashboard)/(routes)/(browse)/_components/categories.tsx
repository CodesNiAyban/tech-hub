"use client"

import { Category } from "@prisma/client";
import { FaJava, FaPython, FaReact } from 'react-icons/fa';
import { IconType } from "react-icons";
import { SiC, SiJavascript, SiRust, SiSvelte } from 'react-icons/si';
import { CategoryItem } from "./category-item";

const iconMap: Record<Category["name"], IconType> = {
    "NextJS": FaReact,
    "Svelete": SiSvelte,
    "JavaScript": SiJavascript,
    "Rust": SiRust,
    "Python": FaPython,
    "C++": SiC,
    "Java": FaJava,
}

interface CategoriesProps {
    items: Category[]
}

export const Categories = ({
    items,
}: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-3 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}

        </div>
    );
}
