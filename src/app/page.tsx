import { getAllTodos } from "../../api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

export default async function Home() {
  const tasks = await getAllTodos();
  console.log(tasks);
  return (
    <main>
      <div className="text-center bg-violet-900 py-5 ">
        <h1 className="text-white font-bold text-2xl">Todo APP</h1>
      </div>
      <AddTask />
      <TodoList tasks={tasks}/>
    </main>
  );
}
