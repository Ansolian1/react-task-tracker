
import React from 'react';
import TaskItem from '../TaskItem/TaskItem'; 
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const TaskList = ({ tasks, onToggle, onDelete, onEdit, onDragEnd }) => {
  if (tasks.length === 0) {
    return <p style={{ textAlign: 'center', color: '#6b7280' }}>Задач пока нет...</p>;
  }


  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext 
        items={tasks.map((task) => task.id.toString())} 
        strategy={verticalListSortingStrategy}
      >
        <div>
          {tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={onToggle} 
              onDelete={onDelete} 
              onEdit={onEdit} 
            />
          ))}
        </div>
      </SortableContext>
      
    </DndContext>
  );
};

export default TaskList;
