"use client"
import { Trophy, Star, Zap, Target, Users, BookOpen } from "lucide-react"

interface AchievementBadgeProps {
  type: "first_swap" | "skill_master" | "quick_learner" | "mentor" | "social" | "knowledge"
  unlocked?: boolean
  className?: string
}

const achievementConfig = {
  first_swap: {
    icon: Trophy,
    label: "First Swap",
    color: "from-yellow-400 to-orange-500",
    description: "Complete your first skill swap",
  },
  skill_master: {
    icon: Star,
    label: "Skill Master",
    color: "from-purple-400 to-pink-500",
    description: "Master 5 different skills",
  },
  quick_learner: {
    icon: Zap,
    label: "Quick Learner",
    color: "from-blue-400 to-cyan-500",
    description: "Complete 3 swaps in a week",
  },
  mentor: {
    icon: Target,
    label: "Mentor",
    color: "from-green-400 to-emerald-500",
    description: "Help 10 people learn new skills",
  },
  social: {
    icon: Users,
    label: "Social Butterfly",
    color: "from-pink-400 to-rose-500",
    description: "Connect with 20 different users",
  },
  knowledge: {
    icon: BookOpen,
    label: "Knowledge Seeker",
    color: "from-indigo-400 to-purple-500",
    description: "Learn from 15 different mentors",
  },
}

export function AchievementBadge({ type, unlocked = false, className = "" }: AchievementBadgeProps) {
  const config = achievementConfig[type]
  const Icon = config.icon

  return (
    <div className={`relative group ${className}`}>
      <div
        className={`
        p-3 rounded-xl transition-all duration-300 cursor-pointer
        ${
          unlocked
            ? `bg-gradient-to-r ${config.color} shadow-lg hover:shadow-xl hover:scale-105`
            : "bg-gray-800 opacity-50 hover:opacity-70"
        }
      `}
      >
        <Icon className={`h-6 w-6 ${unlocked ? "text-white" : "text-gray-500"}`} />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
        <div className="font-semibold">{config.label}</div>
        <div className="text-xs text-gray-300">{config.description}</div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  )
}
