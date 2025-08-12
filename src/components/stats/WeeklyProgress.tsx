import { KawaiiCard, KawaiiCardContent, KawaiiCardHeader, KawaiiCardTitle } from "@/components/ui/kawaii-card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Calendar, TrendingUp, Award } from "lucide-react"

interface DayProgress {
  day: string
  completed: number
  total: number
  percentage: number
}

interface WeeklyProgressProps {
  weekData: DayProgress[]
}

export const WeeklyProgress = ({ weekData }: WeeklyProgressProps) => {
  const totalCompleted = weekData.reduce((sum, day) => sum + day.completed, 0)
  const totalTasks = weekData.reduce((sum, day) => sum + day.total, 0)
  const weeklyPercentage = totalTasks > 0 ? (totalCompleted / totalTasks) * 100 : 0

  const getEmojiForDay = (percentage: number) => {
    if (percentage >= 90) return "🌟"
    if (percentage >= 70) return "💕"
    if (percentage >= 50) return "🌸"
    if (percentage >= 30) return "🌱"
    return "😊"
  }

  const getMotivationalMessage = (percentage: number) => {
    if (percentage >= 90) return "Amazing week! You're a star! ✨"
    if (percentage >= 70) return "Great progress! Keep it up! 💪"
    if (percentage >= 50) return "You're doing well! Stay strong! 🌟"
    if (percentage >= 30) return "Good start! You can do this! 🌱"
    return "Every step counts! You've got this! 💕"
  }

  return (
    <KawaiiCard>
      <KawaiiCardHeader>
        <KawaiiCardTitle className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-kawaii-purple" />
          Weekly Progress 📊
        </KawaiiCardTitle>
      </KawaiiCardHeader>
      <KawaiiCardContent className="space-y-6">
        {/* Overall Week Stats */}
        <div className="kawaii-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-kawaii-pink" />
              <span className="font-semibold font-kawaii">This Week</span>
            </div>
            <span className="text-2xl">{getEmojiForDay(weeklyPercentage)}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tasks completed: {totalCompleted}/{totalTasks}</span>
              <span className="font-semibold">{weeklyPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={weeklyPercentage} className="h-3" />
          </div>
          
          <p className="text-sm text-center text-kawaii-purple font-kawaii">
            {getMotivationalMessage(weeklyPercentage)}
          </p>
        </div>

        {/* Daily Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold gradient-text font-kawaii flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Daily Breakdown
          </h4>
          
          <div className="space-y-2">
            {weekData.map((day, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-card/30">
                <span className="text-lg">{getEmojiForDay(day.percentage)}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-kawaii text-sm">{day.day}</span>
                    <span className="text-xs text-muted-foreground">
                      {day.completed}/{day.total}
                    </span>
                  </div>
                  <Progress value={day.percentage} className="h-2" />
                </div>
                <span className="text-xs font-semibold w-10 text-right">
                  {day.percentage.toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Insights */}
        <div className="kawaii-card p-4 space-y-2">
          <h5 className="font-semibold flex items-center gap-2 text-kawaii-purple font-kawaii">
            <TrendingUp className="w-4 h-4" />
            Weekly Insights
          </h5>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-kawaii-pink">
                {Math.max(...weekData.map(d => d.percentage)).toFixed(0)}%
              </div>
              <div className="text-xs text-muted-foreground">Best Day</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-kawaii-mint">
                {weekData.filter(d => d.percentage >= 70).length}/7
              </div>
              <div className="text-xs text-muted-foreground">Good Days</div>
            </div>
          </div>
        </div>
      </KawaiiCardContent>
    </KawaiiCard>
  )
}