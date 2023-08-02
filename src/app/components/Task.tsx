"use client"; // This is a client component

import { ITask } from "../../../types/tasks";
import { FaPen, FaTrash } from "react-icons/fa";
import { FormEventHandler, useState } from "react";

import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "../../../api";
import moment from "moment";
import { ok } from "assert";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [taskToEditDate, setTaskToEditDate] = useState<string>(task.date);  
  const [checked, setChecked] = useState<boolean>(task.isDone);
  const [newTaskDate, setNewTaskDate] = useState(moment().format('YYYY-MM-DD'));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editTodo({
      id: task.id,
      text: task.text,
      isDone: e.target.checked,
      date: task.date
    });
    setChecked(() => e.target.checked);
  };

  const handleSubmitEditTodo: FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id, // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      text: taskToEdit,
      isDone: checked,
      date: taskToEditDate
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={task.id} className={taskToEditDate < newTaskDate && checked == false ? 'bg-slate-400' : 'bg-white'}>
      <th>
        <input
          id={task.id}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="checkbox checkbox-primary"
        />
      </th>
      <td id="ok" className="">{task.text}</td>
      <td>{task.date}</td>
      <td className="flex gap-7 ">
        <FaPen
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-gray-500"
        />
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
            <input 
            value={taskToEditDate}
            onChange={(e) => setTaskToEditDate(e.target.value)}
            type="date"
            className="input input-bordered w-full"
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </Modal>
        <FaTrash
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-gray-500"
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg">
            Are you sure, you want to delete this task?
          </h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteTask(task.id)} className="btn">
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
