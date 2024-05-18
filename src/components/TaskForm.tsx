import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { Box, TextField, Button } from '@mui/material';

interface TaskFormProps {
  task?: Task | null;
  onSave: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string; date?: string }>({});

  useEffect(() => {
    setTitle(task?.title ?? '');
    setDescription(task?.description ?? '');
    setDate(task?.date ?? '');
  }, [task]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!title) newErrors.title = 'Введите название задачи';
    if (!description) newErrors.description = 'Введите описание задачи';
    if (!date) newErrors.date = 'Введите дату выполнения задачи';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const newTask = {
      id: task ? task.id : Date.now().toString(),
      title,
      description,
      date,
    };
    onSave(newTask);
  };

  return (
    <Box 
      component="form" 
      noValidate 
      autoComplete="off" 
      sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2 }}
    >
      <TextField
        label="Название задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        label="Описание задачи"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        error={!!errors.description}
        helperText={errors.description}
      />
      <TextField
        label="Дата выполнения задачи"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        required
        error={!!errors.date}
        helperText={errors.date}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Сохранить
      </Button>
    </Box>
  );
};

export default TaskForm;
