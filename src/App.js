import React, { useState, useRef } from 'react'; 
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm'; 
import Stats from './components/Stats';
import CategoryFilter from './components/CategoryFilter';
import { useLocalStorage } from './hooks/useLocalStorage';
import TaskSearch from './components/TaskSearch';
import Modal from './components/ui/Modal/Modal';

import { arrayMove } from '@dnd-kit/sortable';

function App() {
  const [tasks, setTasks] = useLocalStorage('my-tasks', [
    { id: 1, text: "Изучить CSS Модули", category: "Учеба", completed: true },
    { id: 2, text: "Покормить кота", category: "Дом", completed: false }
  ]);  
  const [filter, setFilter] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('new');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); 

  const openCreateModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setTaskToEdit(task); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      completed: false
    };
    setTasks([newTask, ...tasks]);
  };

  const editTask = (updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const toggleTask = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;
    if (sortOrder !== 'manual') {
      setSortOrder('manual');
    }

    setTasks((currentTasks) => {
      const oldIndex = currentTasks.findIndex((task) => task.id.toString() === active.id.toString());
      const newIndex = currentTasks.findIndex((task) => task.id.toString() === over.id.toString());
      return arrayMove(currentTasks, oldIndex, newIndex);
    });
  };
  const handleExport = () => {
    const dataStr = JSON.stringify(tasks, null, 2); 
    const blob = new Blob([dataStr], { type: 'application/json' }); 
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-tasks-backup.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const fileInputRef = useRef(null);
  const handleImportClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData)) {
          setTasks(importedData);
          alert('Задачи успешно восстановлены из файла!');
        } else {
          alert('Ошибка: Файл не содержит правильный список задач.');
        }
      } catch (error) {
        alert('Ошибка чтения файла. Убедитесь, что это корректный файл JSON.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };
  
  const filteredTasks = tasks
    .filter(task => {
      const matchCategory = filter === 'Все' || task.category === filter;
      const matchSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'manual') return 0; 
      if (sortOrder === 'new') {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#1f2937', margin: 0 }}>Мои задачи</h1>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* СКРЫТЫЙ ИНПУТ */}
          <input 
            type="file" 
            accept=".json" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }}
          />
          <button 
            onClick={handleImportClick}
            style={{
              background: 'white',
              border: '1px solid #d1d5db',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#4b5563'
            }}
          >
            📥 Импорт
          </button>
          <button 
            onClick={handleExport}
            style={{
              background: 'white',
              border: '1px solid #d1d5db',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#4b5563'
            }}
          >
            📤 Экспорт
          </button>
        </div>
      </div>

      <Stats tasks={tasks} />
      <div style={{ marginBottom: '20px' }}>
         <button 
           onClick={openCreateModal}
           style={{ width: '100%', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' }}
         >
           + Добавить новую задачу
         </button>
      </div>
      
      <TaskSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px', 
        marginBottom: '20px' 
      }}>
        
        <CategoryFilter currentFilter={filter} onFilterChange={setFilter} />
        
        <select 
          value={sortOrder} 
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ 
            padding: '6px 12px', 
            borderRadius: '20px',
            border: '1px solid #d1d5db', 
            outline: 'none',
            cursor: 'pointer',
            backgroundColor: 'white',
            color: '#1f2937'
          }}
        >
          <option value="new">Сначала новые</option>
          <option value="old">Сначала старые</option>
          <option value="manual">Ручной порядок (Drag&Drop)</option>
        </select>

      </div>
      
      <TaskList 
        tasks={filteredTasks.filter(task => task.id)} 
        onToggle={toggleTask} 
        onDelete={deleteTask} 
        onEdit={openEditModal} 
        onDragEnd={handleDragEnd}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TaskForm 
          taskToEdit={taskToEdit} 
          closeModal={closeModal} 
          onSave={taskToEdit ? editTask : addTask} 
        />
      </Modal>

    </div>
  );
}
export default App;