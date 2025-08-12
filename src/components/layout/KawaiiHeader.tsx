import { supabase } from "@/integrations/supabase/client"
import { KawaiiButton } from "@/components/ui/kawaii-button"
import { useToast } from "@/hooks/use-toast"
import { LogOut, Settings, Heart } from "lucide-react"

export const KawaiiHeader = () => {
  const { toast } = useToast()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "See you later! 💕",
        description: "You've been signed out successfully",
      })
    }
  }

  return (
    <header className="kawaii-card m-4 mb-0">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-kawaii-pink animate-pulse" />
          <h1 className="text-2xl font-bold gradient-text font-kawaii">
            Kawaii Todo
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <KawaiiButton variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </KawaiiButton>
          <KawaiiButton
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="font-kawaii"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </KawaiiButton>
        </div>
      </div>
    </header>
  )
}