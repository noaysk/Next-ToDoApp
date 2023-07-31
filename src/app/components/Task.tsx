"use client"; // This is a client component

import { ITask } from "../../../types/tasks";
import { FaPen, FaTrash } from "react-icons/fa";
import { FormEventHandler, useState } from "react";

import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "../../../api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id, // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      text: taskToEdit
    })
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask =async(id: string)=>{
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();

  }
  return (
    <tr key={task.id}>
      <th>
        <input type="checkbox" className="checkbox checkbox-primary" />
      </th>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FaPen onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-gray-500" />

        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <input
              value={taskToEdit}
              onChange={(e) => setTaskToEdit(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            ></input>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </Modal>

        <FaTrash onClick={() => setOpenModalDeleted(true)} cursor="pointer" className="text-gray-500" />

        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
         <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
         <div className="modal-action">
            <button onClick={() => handleDeleteTask(task.id)} className="btn">Yes</button>
         </div>
        </Modal>

      </td>
    </tr>
  );
};

export default Task;
