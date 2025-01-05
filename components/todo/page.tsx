"use client"
import { StoreModel } from "@/stateStorage/store";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import { Button } from "../ui/button";

const TodoItem = () => {
    const data = useStoreState<StoreModel>((state) => state.todos.todos);
    const deleteData = useStoreActions<StoreModel>((state) => state.todos.deleteTodo);
    const [completed, setCompleted] = useState<Record<string, boolean>>({});
    const [prices, setPrices] = useState<Record<string, string>>({});
    const [isPriceInputVisible, setIsPriceInputVisible] = useState<Record<string, boolean>>({});

    const toggleCompleted = (item: string) => {
        setCompleted((prev) => ({
            ...prev,
            [item]: !prev[item],
        }));
    };

    const updatePrice = (item: string, value: string) => {
        setPrices((prev) => ({
            ...prev,
            [item]: value,
        }));
    };

    const handlePriceInputBlur = (item: string) => {
        if (!prices[item]) {
            setIsPriceInputVisible((prev) => ({
                ...prev,
                [item]: false,
            }));
        }
    };

    const handlePriceSubmit = (item: string) => {
        setIsPriceInputVisible((prev) => ({
            ...prev,
            [item]: false,
        }));
    };

    const formatPrice = (price: string) => {
        const number = parseInt(price.replace(/\D/g, ''), 10); // Menghapus semua karakter non-digit
        if (isNaN(number)) return '';

        // Memformat harga dengan titik sebagai pemisah ribuan
        return number.toLocaleString('id-ID').replace(/,/g, '.');
    };

    const handleKeyDown = (e: React.KeyboardEvent, item: string) => {
        if (e.key === 'Enter') {
            handlePriceSubmit(item);
        }
    };

    return (
        <ul className="mt-0 space-y-3 w-full">
            {data.length > 0 ? (
                data.map((value: string, index: number) => (
                    <li
                        key={index}
                        className="flex flex-col border rounded-md border-stone-200 p-2"
                    >
                        <div className="flex items-center justify-between">
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
                                variant={"ghost"}
                                className="font-medium ml-2"
                                onClick={() => setIsPriceInputVisible((prev) => ({
                                    ...prev,
                                    [value]: !prev[value],
                                }))}
                            >
                                + Harga
                            </Button>
                            <Button
                                variant={"secondary"}
                                className="font-medium"
                                onClick={() => deleteData(value)}
                            >
                                Hapus
                            </Button>
                        </div>

                        {isPriceInputVisible[value] && (
                            <div className="mt-2 flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Masukkan harga"
                                    value={prices[value] || ""}
                                    onChange={(e) => updatePrice(value, e.target.value)}
                                    onBlur={() => handlePriceInputBlur(value)}
                                    onKeyDown={(e) => handleKeyDown(e, value)} // Menambahkan event listener untuk Enter
                                    className="p-2 border border-stone-300 rounded-md text-sm"
                                />
                                <Button
                                    className="font-medium"
                                    onClick={() => handlePriceSubmit(value)}
                                >
                                    Simpan
                                </Button>
                            </div>
                        )}

                        {prices[value] && (
                            <span className="text-stone-500 mt-1 text-sm">
                                Harga: Rp {formatPrice(prices[value])}
                            </span>
                        )}
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
