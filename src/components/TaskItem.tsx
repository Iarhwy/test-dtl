import React, { useState } from 'react';
import { Task } from '../types';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmation from './DeleteConfirmation';

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete();
    setIsDeleteModalOpen(false);
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5">{task.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.date}
        </Typography>
        <IconButton onClick={onEdit} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => setIsDeleteModalOpen(true)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardContent>
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Card>
  );
};

export default TaskItem;
