"use client"; // This is a client component
import { FormEventHandler, useState } from "react";
import { addTodo } from "../../../api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const handleSubmitNewTodo: FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      text: newTaskValue,
      isDone: checked,
    });
    setNewTaskValue("");
    setChecked(false);
    router.refresh();
  };
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center my-0 mx-auto">
      <form onSubmit={handleSubmitNewTodo}>
        <input
          value={newTaskValue}
          onChange={(e) => setNewTaskValue(e.target.value)}
          type="text"
          placeholder="Enter Title"
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-primary">
          ADD
        </button>
      </form>
    </div>
  );
};
export default AddTask;
