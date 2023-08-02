import { ITask } from "../../../types/tasks";
import Task from "./Task";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto py-5 px-40">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>date</th>
            <th>Edit Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>      
    </div>
  );
};
export default TodoList;
