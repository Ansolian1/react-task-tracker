import React, { useState, useEffect } from 'react';
import styles from './TaskForm.module.css';
import Input from '../ui/Input';
import Button from '../ui/Button';

const TaskForm = ({ taskToEdit, closeModal, onSave }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Работа');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');

  useEffect(() => {
    if (taskToEdit) {
      setText(taskToEdit.text);
      setCategory(taskToEdit.category || 'Работа');
      setDueDate(taskToEdit.dueDate || '');
      setPriority(taskToEdit.priority || 'low');
    } else {
      setText('');
      setCategory('Работа');
      setDueDate('');
      setPriority('low');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;

    const taskData = {
      id: taskToEdit ? taskToEdit.id : undefined,
      text,
      category,
      dueDate,
      priority,
      completed: taskToEdit ? taskToEdit.completed : false,
    };

    onSave(taskData);
    closeModal();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>
        {taskToEdit ? 'Редактировать задачу' : 'Создание новой задачи'}
      </h2>      <div className={styles.fieldGroup}>
        <label className={styles.topLabel}>Название задачи</label>
        <Input
          placeholder="" 
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className={styles.rowGroup}>
        <label className={styles.sideLabel}>Категория</label>
        <select
          className={styles.selectInput}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Работа">Работа</option>
          <option value="Дом">Дом</option>
          <option value="Учеба">Учеба</option>
          <option value="Личное">Личное</option>
        </select>
      </div>
      <div className={styles.rowGroup}>
        <label className={styles.sideLabel}>Дата</label>
        <input
          type="date"
          className={styles.selectInput}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className={styles.priorityGroup}>
        <span className={styles.priorityTitle}>Приоритет</span>
        
        <div className={styles.radioList}>
          <label className={styles.radioLabel}>
            <input type="radio" value="high" checked={priority === 'high'} onChange={(e) => setPriority(e.target.value)} className={styles.hiddenRadio} />
            <span className={`${styles.customRadio} ${styles.high}`}></span>
            Высокий
          </label>
          
          <label className={styles.radioLabel}>
            <input type="radio" value="medium" checked={priority === 'medium'} onChange={(e) => setPriority(e.target.value)} className={styles.hiddenRadio} />
            <span className={`${styles.customRadio} ${styles.medium}`}></span>
            Средний
          </label>
          
          <label className={styles.radioLabel}>
            <input type="radio" value="low" checked={priority === 'low'} onChange={(e) => setPriority(e.target.value)} className={styles.hiddenRadio} />
            <span className={`${styles.customRadio} ${styles.low}`}></span>
            Низкий
          </label>
        </div>
      </div>
      <div className={styles.buttonsRow}>
        <button type="button" onClick={closeModal} className={styles.cancelBtn}>
          Отмена
        </button>
        <div style={{ flex: 1 }}> {/* Обертка, чтобы Button занял всю ширину */}
           <Button type="submit" style={{ width: '100%', height: '100%' }}>
             Сохранить
           </Button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;