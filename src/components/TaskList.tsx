import React from 'react';
import { useUnit } from 'effector-react';
import { $tasks, deleteTask } from '../stores/taskStore';
import TaskItem from './TaskItem';
import { Task } from '../types';
import { Box } from '@mui/material';

const TaskList: React.FC<{ onEdit: (task: Task) => void }> = ({ onEdit }) => {
  const tasks = useUnit($tasks);

  return (
    <Box>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={() => deleteTask(task.id)}
          onEdit={() => onEdit(task)}
        />
      ))}
    </Box>
  );
};

export default TaskList;
