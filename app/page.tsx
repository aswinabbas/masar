"use client";

import TodoItem from "@/components/todo/page";
import { StoreModel } from "@/stateStorage/store";
import { useStoreActions } from "easy-peasy";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Home() {
  const setTodo = useStoreActions<StoreModel>((actions) => actions.todos.setToDo);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim();

    if (!name) {
      alert("Nama tidak boleh kosong!");
      return;
    }

    setTodo(name);
    e.currentTarget.reset();
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-10 sm:p-20 sm:mt-4 font-[family-name:var(--font-geist-sans)] bg-[#f9fafb]">
      {/* Bagian Header dan Form */}
      <div className="flex flex-col w-full gap-2">
        <h1 className="text-center font-semibold text-lg">Tambah Item Belanja</h1>
        <form onSubmit={onSubmit}>
          <div className="flex justify-between items-center gap-4">
            <Input
              type="name"
              placeholder="list belanja apa aja..."
              name="name"
            />
            <Button type="submit">Tambah</Button>
          </div>
        </form>
      </div>
      {/* Bagian yang Bisa Discrolling */}
      <div className="w-full max-h-[60vh] overflow-y-auto">
        <TodoItem />
      </div>

      <span className='flex text-xs text-gray-400 font-light gap-2 items-center'>
        <GitHubLogoIcon />
        <a
          href="https://github.com/aswinabbas/masar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 underline mr-2"
        >
          Source Code
        </a>
      </span>
    </div>
  );
}
