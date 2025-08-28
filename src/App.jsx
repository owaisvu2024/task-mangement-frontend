// Zaroori packages import kar rahe hain
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ProgressBar from './components/ProgressBar';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Auth from './components/Auth';
import axios from 'axios';

// ====== NEW: API base URL (local .env se utha lo; warna localhost) ======
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Socket.IO client ko server se connect
const socket = io(API_URL);

function App() {
  // ====== NEW: Dark Mode state (persist with localStorage) ======
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true; // default: dark
  });

  // Application states
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [editingTask, setEditingTask] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // Custom Modals
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const [promptInput, setPromptInput] = useState('');
  const [onPromptSubmit, setOnPromptSubmit] = useState(null);

  // ====== NEW: axios baseURL + auth header ======
  axios.defaults.baseURL = API_URL;
  axios.defaults.headers.common['Authorization'] = token;

  // ====== NEW: apply dark class on <body> ======
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Notifications (Socket)
  useEffect(() => {
    socket.on('notification', (data) => {
      setNotifications(prev => [data, ...prev]);
      showCustomAlert(`New Notification: ${data.message}`);
    });
    return () => {
      socket.off('notification');
    };
  }, []);

  // Custom Alert
  const showCustomAlert = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  // Custom Prompt
  const showCustomPrompt = (message, onSubmit) => {
    setPromptMessage(message);
    setPromptInput('');
    setShowPromptModal(true);
    setOnPromptSubmit(() => onSubmit);
  };

  // Server se tasks fetch
  const fetchTasks = async () => {
    try {
      const personalResponse = await axios.get(`/api/tasks`);
      const personalTasks = personalResponse.data;
      const sharedResponse = await axios.get(`/api/tasks/shared`);
      const sharedTasks = sharedResponse.data;

      const uniqueTasksMap = new Map();
      personalTasks.forEach(task => uniqueTasksMap.set(task._id, task));
      sharedTasks.forEach(task => uniqueTasksMap.set(task._id, task));
      const uniqueTasks = Array.from(uniqueTasksMap.values());

      setTasks(uniqueTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error?.response);
      if (error?.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  // Search/filter
  useEffect(() => {
    let filtered = [...tasks];
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterStatus !== 'All') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }
    setFilteredTasks(filtered);
  }, [tasks, searchQuery, filterStatus]);

  // Initial load
  useEffect(() => {
    if (isLoggedIn && !showAnalytics) {
      fetchTasks();
    }
  }, [isLoggedIn, showAnalytics]);

  // Handlers
  const handleTaskAdded = async () => {
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error?.response);
    }
  };

  const handleUpdateClick = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await axios.put(`/api/tasks/${updatedTask._id}`, updatedTask);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error?.response);
    }
  };

  const handleCancelUpdate = () => {
    setEditingTask(null);
  };

  const handleShareTask = async (taskId) => {
    showCustomPrompt('Enter User ID to share with:', async (userId) => {
      if (userId) {
        try {
          await axios.put(`/api/tasks/${taskId}/share`, { userId });
          await fetchTasks();
          showCustomAlert('Task shared successfully!');
        } catch (error) {
          console.error('Error sharing task:', error?.response?.data?.message);
          showCustomAlert(`Error sharing task: ${error?.response?.data?.message || 'Unknown error'}`);
        }
      }
    });
  };

  const handleAuthSuccess = (newToken) => {
    setToken(newToken);
    setIsLoggedIn(true);
    localStorage.setItem('token', newToken);
    axios.defaults.headers.common['Authorization'] = newToken;
    fetchTasks();
  };

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setTasks([]);
    setFilteredTasks([]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'var(--pending-color)';
      case 'In Progress':
        return 'var(--in-progress-color)';
      case 'Completed':
        return 'var(--completed-color)';
      default:
        return 'var(--default-color)';
    }
  };

  return (
    <div className="app-container">
      <h1 className="main-title">Task Manager App</h1>

      {!isLoggedIn ? (
        <Auth onAuthSuccess={handleAuthSuccess} />
      ) : (
        <>
          {/* Header buttons */}
          <div className="header-buttons">
            {/* NEW: Dark mode toggle */}
            <button
              onClick={() => setDarkMode((d) => !d)}
              className="header-button"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            <button
              onClick={handleLogout}
              className="header-button"
            >
              Logout
            </button>

            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="header-button"
            >
              {showAnalytics ? 'View Tasks' : 'View Analytics'}
            </button>
          </div>

          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="notification-container">
              <h3 className="notification-heading">Notifications:</h3>
              {notifications.map((notif, index) => (
                <p key={index} className="notification-text">
                  {notif.message}
                </p>
              ))}
            </div>
          )}

          {showAnalytics ? (
            <AnalyticsDashboard />
          ) : (
            <>
              <ProgressBar tasks={filteredTasks} />

              <div className="search-filter-container">
                <input
                  type="text"
                  placeholder="Search tasks by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="status-filter"
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {editingTask ? (
                <TaskForm
                  taskToEdit={editingTask}
                  onTaskUpdated={handleUpdateTask}
                  onCancel={handleCancelUpdate}
                />
              ) : (
                <>
                  <TaskForm onTaskAdded={handleTaskAdded} />
                  <TaskList
                    tasks={filteredTasks}
                    onTaskDeleted={handleDeleteTask}
                    onTaskUpdated={handleUpdateClick}
                    onTaskShared={handleShareTask}
                    getStatusColor={getStatusColor}
                    onAttachmentsChanged={fetchTasks}
                  />
                </>
              )}
            </>
          )}
        </>
      )}

      {/* Custom Alert Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="modal-message">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="modal-button"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Custom Prompt Modal */}
      {showPromptModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="modal-message">{promptMessage}</p>
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              className="modal-input"
            />
            <div className="modal-buttons">
              <button
                onClick={() => setShowPromptModal(false)}
                className="modal-button cancel"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onPromptSubmit(promptInput);
                  setShowPromptModal(false);
                }}
                className="modal-button share"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles aur animations CSS file mein move kar diye gaye hain */}
    </div>
  );
}

export default App;