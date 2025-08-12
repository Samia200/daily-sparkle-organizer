import { useState } from "react"
import { KawaiiCard, KawaiiCardContent, KawaiiCardHeader, KawaiiCardTitle } from "@/components/ui/kawaii-card"
import { KawaiiButton } from "@/components/ui/kawaii-button"
import { KawaiiInput } from "@/components/ui/kawaii-input"
import { Progress } from "@/components/ui/progress"
import { Target, Plus, Timer, TrendingUp, X } from "lucide-react"

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

interface GoalsCardProps {
  goals: Goal[]
  onAddGoal: (goal: Omit<Goal, 'id'>) => void
  onUpdateProgress: (id: string, progress: number) => void
  onDeleteGoal: (id: string) => void
}

export const GoalsCard = ({ goals, onAddGoal, onUpdateProgress, onDeleteGoal }: GoalsCardProps) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    target: 100,
    duration: "",
    category: 'personal' as Goal['category'],
    emoji: "🎯"
  })

  const handleAddGoal = () => {
    if (newGoal.title.trim()) {
      onAddGoal({
        ...newGoal,
        progress: 0
      })
      setNewGoal({
        title: "",
        description: "",
        target: 100,
        duration: "",
        category: 'personal',
        emoji: "🎯"
      })
      setShowAddForm(false)
    }
  }

  const getCategoryColor = (category: Goal['category']) => {
    switch (category) {
      case 'health': return 'text-kawaii-mint'
      case 'work': return 'text-kawaii-purple'
      case 'personal': return 'text-kawaii-pink'
      case 'learning': return 'text-kawaii-lavender'
      default: return 'text-foreground'
    }
  }

  return (
    <KawaiiCard>
      <KawaiiCardHeader>
        <KawaiiCardTitle className="flex items-center gap-2">
          <Target className="w-6 h-6 text-kawaii-purple" />
          Goals & Dreams ✨
        </KawaiiCardTitle>
      </KawaiiCardHeader>
      <KawaiiCardContent className="space-y-4">
        {/* Goals List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {goals.map((goal) => (
            <div key={goal.id} className="kawaii-card p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{goal.emoji}</span>
                  <div>
                    <h4 className="font-semibold font-kawaii">{goal.title}</h4>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full bg-secondary/50 ${getCategoryColor(goal.category)}`}>
                    {goal.category}
                  </span>
                  <KawaiiButton
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteGoal(goal.id)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </KawaiiButton>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Progress: {goal.progress}%
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Timer className="w-3 h-3" />
                    {goal.duration}
                  </span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>

              <div className="flex gap-2">
                <KawaiiButton
                  size="sm"
                  variant="cute"
                  onClick={() => onUpdateProgress(goal.id, Math.min(goal.progress + 10, 100))}
                  disabled={goal.progress >= 100}
                >
                  +10%
                </KawaiiButton>
                <KawaiiButton
                  size="sm"
                  variant="soft"
                  onClick={() => onUpdateProgress(goal.id, Math.max(goal.progress - 10, 0))}
                  disabled={goal.progress <= 0}
                >
                  -10%
                </KawaiiButton>
              </div>
            </div>
          ))}
        </div>

        {/* Add Goal Form */}
        {showAddForm ? (
          <div className="space-y-3 kawaii-card p-4">
            <h4 className="font-semibold gradient-text font-kawaii">Add New Goal</h4>
            <KawaiiInput
              placeholder="Goal title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
            />
            <KawaiiInput
              placeholder="Description"
              value={newGoal.description}
              onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
            />
            <KawaiiInput
              placeholder="Duration (e.g., 30 days)"
              value={newGoal.duration}
              onChange={(e) => setNewGoal({...newGoal, duration: e.target.value})}
            />
            <div className="flex gap-2">
              <KawaiiButton size="sm" onClick={handleAddGoal} variant="cute">
                Add Goal
              </KawaiiButton>
              <KawaiiButton size="sm" variant="ghost" onClick={() => setShowAddForm(false)}>
                Cancel
              </KawaiiButton>
            </div>
          </div>
        ) : (
          <KawaiiButton
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(true)}
            className="w-full font-kawaii"
          >
            <Plus className="w-4 h-4" />
            Add New Goal
          </KawaiiButton>
        )}
      </KawaiiCardContent>
    </KawaiiCard>
  )
}