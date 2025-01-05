"use client"
import { StoreModel } from "@/stateStorage/store";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import { Button } from "../ui/button";

const TodoItem = () => {
    const data = useStoreState<StoreModel>((state) => state.todos.todos);
    const deleteData = useStoreActions<StoreModel>((state) => state.todos.deleteTodo);
    const [completed, setCompleted] = useState<Record<string, boolean>>({});

    const toggleCompleted = (item: string) => {
        setCompleted((prev) => ({
            ...prev,
            [item]: !prev[item], // Toggle status selesai
        }));
    };

    return (
        <ul className="mt-0 space-y-3 w-full">
            {data.length > 0 ? (
                data.map((value: string, index: number) => (
                    <li
                        key={index}
                        className="flex items-center border border-stone-200 p-2 justify-between"
                    >
                        <label className="flex items-center cursor-pointer w-full">
                            <input
                                type="checkbox"
                                checked={!!completed[value]}
                                onChange={() => toggleCompleted(value)}
                                className="mr-2"
                            />
                            <span
                                className={`${completed[value] ? "line-through text-stone-400" : ""
                                    }`}
                            >
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            </span>
                        </label>
                        <Button
                            variant={"outline"}
                            className="font-medium"
                            onClick={() => deleteData(value)}
                        >
                            Hapus
                        </Button>
                    </li>
                ))
            ) : (
                <li className="text-center text-stone-400">
                    Belum ada list belanja...
                </li>
            )}
        </ul>

    );
};

export default TodoItem;
