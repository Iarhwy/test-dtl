import React, { useState } from 'react';
import TaskList from './components/TaskList';
import Modal from './components/Modal';
import TaskForm from './components/TaskForm';
import { addTask, editTask } from './stores/taskStore';
import { Task } from './types';
import { Container, Typography, Button } from '@mui/material';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (currentTask) {
      editTask(task);
    } else {
      addTask(task);
    }
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        To Do List
      </Typography>
      <Button variant="contained" onClick={handleAddTask} sx={{ marginBottom: 2 }}>
        Добавить задачу
      </Button>
      <TaskList onEdit={handleEditTask} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm task={currentTask} onSave={handleSaveTask} />
      </Modal>
    </Container>
  );
};

export default App;
