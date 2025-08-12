import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { KawaiiCard, KawaiiCardContent, KawaiiCardDescription, KawaiiCardHeader, KawaiiCardTitle } from "@/components/ui/kawaii-card"
import { KawaiiButton } from "@/components/ui/kawaii-button"
import { KawaiiInput } from "@/components/ui/kawaii-input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Heart, Star, Sparkles } from "lucide-react"
import welcomeBg from "@/assets/welcome-bg.png"

interface AuthFormProps {
  mode: 'signin' | 'signup'
  onToggleMode: () => void
}

export const AuthForm = ({ mode, onToggleMode }: AuthFormProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        toast({
          title: "Welcome! ✨",
          description: "Please check your email to verify your account",
        })
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        toast({
          title: "Welcome back! 💕",
          description: "You're all set to organize your day",
        })
      }
    } catch (error: any) {
      toast({
        title: "Oops! 😅",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src={welcomeBg} 
          alt="Welcome background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Floating decorations */}
      <div className="absolute top-20 left-20 animate-float">
        <Heart className="w-8 h-8 text-kawaii-pink" />
      </div>
      <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: '1s' }}>
        <Star className="w-6 h-6 text-kawaii-purple" />
      </div>
      <div className="absolute bottom-32 left-40 animate-float" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-10 h-10 text-kawaii-lavender" />
      </div>
      <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
        <Heart className="w-6 h-6 text-kawaii-mint" />
      </div>

      <KawaiiCard className="w-full max-w-md relative z-10 animate-bounce-soft">
        <KawaiiCardHeader className="text-center">
          <KawaiiCardTitle className="text-3xl font-kawaii animate-glow">
            {mode === 'signin' ? '💕 Welcome Back!' : '✨ Join Kawaii Todo!'}
          </KawaiiCardTitle>
          <KawaiiCardDescription className="text-lg font-kawaii">
            {mode === 'signin' 
              ? 'Ready to organize your cute day?' 
              : 'Start your adorable productivity journey!'}
          </KawaiiCardDescription>
        </KawaiiCardHeader>
        <KawaiiCardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-kawaii">Email</Label>
              <KawaiiInput
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-kawaii">Password</Label>
              <KawaiiInput
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <KawaiiButton
              type="submit"
              variant="welcome"
              className="w-full font-kawaii"
              disabled={loading}
            >
              {loading ? '✨ Loading...' : mode === 'signin' ? '💕 Sign In' : '🌟 Sign Up'}
            </KawaiiButton>
          </form>
          
          <div className="text-center">
            <KawaiiButton
              variant="ghost"
              onClick={onToggleMode}
              className="font-kawaii text-sm"
            >
              {mode === 'signin' 
                ? "Don't have an account? Sign up! 🌸" 
                : 'Already have an account? Sign in! 💫'}
            </KawaiiButton>
          </div>
        </KawaiiCardContent>
      </KawaiiCard>
    </div>
  )
}