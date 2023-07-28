import { ITask } from "../../../types/tasks";

interface TaskProps{
    task: ITask
}

const Task: React.FC<TaskProps> = ({task}) =>{
    return(
          <tr key={task.id}>
              <th>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </th>
              <td>{task.text}</td>
            </tr>
    )
   
       
}

export default Task;