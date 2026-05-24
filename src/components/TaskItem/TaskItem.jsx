
import React from 'react';
import styles from './TaskItem.module.css';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Словарик для перевода приоритетов
const priorityLabels = {
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий'
};

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id.toString() }); 

  const dndStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Красиво форматируем дату (чтобы было "12.05" вместо "12.05.2026")
  const formattedDate = task.dueDate 
    ? new Date(task.dueDate).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
    : null;

  return (
    <div 
      ref={setNodeRef} 
      style={dndStyle} 
      className={`${styles.item} ${task.completed ? styles.completedItem : ''}`}
    >
      <div 
        {...attributes} 
        {...listeners} 
        className={styles.dragHandle}
        title="Потяните, чтобы переместить"
      >
        ⋮⋮
      </div>
      <div className={styles.cardContent}>
        <div className={styles.topRow}>
          <div className={styles.titleArea}>
            <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
            <span className={`${styles.taskText} ${task.completed ? styles.completedText : ''}`}>
              {task.text}
            </span>
          </div>

          <div className={styles.metaArea}>
            {task.priority && (
              <span className={styles.priorityBox}>
                <div className={`${styles.priorityIndicator} ${styles[task.priority]}`}></div>
                {priorityLabels[task.priority]}
              </span>
            )}
            {formattedDate && (
              <span className={styles.dueDateText}>
                до {formattedDate}
              </span>
            )}
          </div>
        </div>
        <div className={styles.bottomRow}>
          <div>
            {task.category && (
              <span className={styles.categoryBadge}>{task.category}</span>
            )}
          </div>
          
          <div className={styles.actionsBox}>
            <Button onClick={() => onEdit(task)}>Редактировать</Button>
            <Button variant="danger" onClick={() => onDelete(task.id)}>Удалить</Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TaskItem;
