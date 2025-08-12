import { useState, useEffect } from "react"
import { KawaiiHeader } from "@/components/layout/KawaiiHeader"
import { TodoCard } from "@/components/todo/TodoCard"
import { GoalsCard } from "@/components/goals/GoalsCard"
import { WeeklyProgress } from "@/components/stats/WeeklyProgress"
import homeBg from "@/assets/home-bg.png"

interface Todo {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  time?: string
}

interface Goal {
  id: string
  title: string
  description: string
  progress: number
  target: number
  duration: string
  category: 'health' | 'work' | 'personal' | 'learning'
  emoji: string
}

const HomePage = () => {
  // Sample data for demonstration
  const [todos, setTodos] = useState<Record<string, Todo[]>>({
    today: [
      { id: '1', title: 'Review morning emails', completed: true, priority: 'medium', time: '09:00' },
      { id: '2', title: 'Complete project proposal', completed: false, priority: 'high', time: '14:00' },
      { id: '3', title: 'Take a walk in the park', completed: false, priority: 'low', time: '18:00' }
    ],
    tomorrow: [
      { id: '4', title: 'Team meeting preparation', completed: false, priority: 'high', time: '10:00' },
      { id: '5', title: 'Grocery shopping', completed: false, priority: 'medium' }
    ]
  })

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Learn Japanese',
      description: 'Practice Japanese conversation daily',
      progress: 65,
      target: 100,
      duration: '3 months',
      category: 'learning',
      emoji: '🇯🇵'
    },
    {
      id: '2',
      title: 'Morning Yoga',
      description: 'Practice yoga every morning',
      progress: 80,
      target: 100,
      duration: '30 days',
      category: 'health',
      emoji: '🧘‍♀️'
    }
  ])

  // Sample weekly data
  const weekData = [
    { day: 'Monday', completed: 8, total: 10, percentage: 80 },
    { day: 'Tuesday', completed: 6, total: 8, percentage: 75 },
    { day: 'Wednesday', completed: 9, total: 10, percentage: 90 },
    { day: 'Thursday', completed: 5, total: 7, percentage: 71 },
    { day: 'Friday', completed: 4, total: 6, percentage: 67 },
    { day: 'Saturday', completed: 3, total: 4, percentage: 75 },
    { day: 'Sunday', completed: 2, total: 3, percentage: 67 }
  ]

  const addTodo = (day: string, title: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority: 'medium'
    }
    setTodos(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), newTodo]
    }))
  }

  const toggleTodo = (day: string, id: string) => {
    setTodos(prev => ({
      ...prev,
      [day]: prev[day]?.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ) || []
    }))
  }

  const deleteTodo = (day: string, id: string) => {
    setTodos(prev => ({
      ...prev,
      [day]: prev[day]?.filter(todo => todo.id !== id) || []
    }))
  }

  const addGoal = (newGoal: Omit<Goal, 'id'>) => {
    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString()
    }
    setGoals(prev => [...prev, goal])
  }

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id ? { ...goal, progress } : goal
    ))
  }

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id))
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <img 
          src={homeBg} 
          alt="Home background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10">
        <KawaiiHeader />
        
        <main className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Today's Tasks */}
          <div className="space-y-6">
            <TodoCard
              title="Today's Tasks"
              date={getCurrentDate()}
              todos={todos.today || []}
              onAddTodo={(title) => addTodo('today', title)}
              onToggleTodo={(id) => toggleTodo('today', id)}
              onDeleteTodo={(id) => deleteTodo('today', id)}
            />
            
            <TodoCard
              title="Tomorrow's Plan"
              date={getTomorrowDate()}
              todos={todos.tomorrow || []}
              onAddTodo={(title) => addTodo('tomorrow', title)}
              onToggleTodo={(id) => toggleTodo('tomorrow', id)}
              onDeleteTodo={(id) => deleteTodo('tomorrow', id)}
            />
          </div>

          {/* Middle Column - Goals */}
          <div>
            <GoalsCard
              goals={goals}
              onAddGoal={addGoal}
              onUpdateProgress={updateGoalProgress}
              onDeleteGoal={deleteGoal}
            />
          </div>

          {/* Right Column - Weekly Progress */}
          <div>
            <WeeklyProgress weekData={weekData} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default HomePage