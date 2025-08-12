import { useState } from "react"
import { KawaiiCard } from "@/components/ui/kawaii-card"
import { KawaiiButton } from "@/components/ui/kawaii-button"
import { KawaiiInput } from "@/components/ui/kawaii-input"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Calendar, Clock, Star } from "lucide-react"

interface Todo {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  time?: string
}

interface TodoCardProps {
  title: string
  date: string
  todos: Todo[]
  onAddTodo: (title: string) => void
  onToggleTodo: (id: string) => void
}

export const TodoCard = ({ title, date, todos, onAddTodo, onToggleTodo }: TodoCardProps) => {
  const [newTodo, setNewTodo] = useState("")
  const [showInput, setShowInput] = useState(false)

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim())
      setNewTodo("")
      setShowInput(false)
    }
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const progressPercentage = todos.length > 0 ? (completedCount / todos.length) * 100 : 0

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔥'
      case 'medium': return '⭐'
      case 'low': return '🌸'
      default: return '📝'
    }
  }

  return (
    <KawaiiCard className="h-fit">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg gradient-text font-kawaii">{title}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {date}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-kawaii">{completedCount}/{todos.length}</div>
            <div className="text-xs text-muted-foreground">completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Todo List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {todos.map((todo) => (
            <div 
              key={todo.id}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                todo.completed ? 'bg-success/10' : 'bg-card/50'
              }`}
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => onToggleTodo(todo.id)}
                className="data-[state=checked]:bg-success"
              />
              <div className="flex-1">
                <span className={`font-kawaii ${
                  todo.completed ? 'line-through text-muted-foreground' : ''
                }`}>
                  {todo.title}
                </span>
                {todo.time && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {todo.time}
                  </div>
                )}
              </div>
              <span className="text-lg">{getPriorityIcon(todo.priority)}</span>
            </div>
          ))}
        </div>

        {/* Add Todo */}
        {showInput ? (
          <div className="flex gap-2">
            <KawaiiInput
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              className="font-kawaii"
              autoFocus
            />
            <KawaiiButton size="sm" onClick={handleAddTodo} variant="cute">
              Add
            </KawaiiButton>
          </div>
        ) : (
          <KawaiiButton
            variant="outline"
            size="sm"
            onClick={() => setShowInput(true)}
            className="w-full font-kawaii"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </KawaiiButton>
        )}
      </div>
    </KawaiiCard>
  )
}