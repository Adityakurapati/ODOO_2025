"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProgressRing } from "@/components/ui/progress-ring"
import { AchievementBadge } from "@/components/ui/achievement-badge"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import {
  Search,
  Star,
  MapPin,
  Clock,
  User,
  Plus,
  X,
  Check,
  MessageSquare,
  Trophy,
  Zap,
  Target,
  TrendingUp,
  Award,
  Flame,
  Crown,
  Sparkles,
  Users,
  Brain,
  Rocket,
  Shield,
  Heart,
} from "lucide-react"

// Mock data with gamification elements
const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    skillsOffered: ["React", "JavaScript", "UI/UX Design"],
    skillsWanted: ["Python", "Data Analysis"],
    availability: "Weekends",
    rating: 4.8,
    level: 12,
    xp: 2450,
    streak: 7,
    completedSwaps: 23,
    isPublic: true,
    badges: ["skill_master", "mentor", "social"],
  },
  {
    id: 2,
    name: "Mike Johnson",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=40&width=40",
    skillsOffered: ["Python", "Machine Learning", "Data Science"],
    skillsWanted: ["React", "Frontend Development"],
    availability: "Evenings",
    rating: 4.9,
    level: 15,
    xp: 3200,
    streak: 12,
    completedSwaps: 31,
    isPublic: true,
    badges: ["quick_learner", "knowledge", "mentor"],
  },
  {
    id: 3,
    name: "Emma Davis",
    location: "London, UK",
    avatar: "/placeholder.svg?height=40&width=40",
    skillsOffered: ["Photoshop", "Graphic Design", "Branding"],
    skillsWanted: ["Video Editing", "Motion Graphics"],
    availability: "Flexible",
    rating: 4.7,
    level: 9,
    xp: 1800,
    streak: 4,
    completedSwaps: 18,
    isPublic: true,
    badges: ["first_swap", "social"],
  },
]

const mockSwapRequests = [
  {
    id: 1,
    from: "Mike Johnson",
    to: "You",
    skillOffered: "Python",
    skillWanted: "React",
    status: "pending",
    message: "Hi! I'd love to help you learn Python in exchange for React lessons.",
    xpReward: 150,
  },
  {
    id: 2,
    from: "You",
    to: "Emma Davis",
    skillOffered: "JavaScript",
    skillWanted: "Photoshop",
    status: "accepted",
    message: "Looking forward to learning Photoshop from you!",
    xpReward: 200,
  },
]

export default function SkillSwapPlatform() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [profile, setProfile] = useState({
    name: "Alex Thompson",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=100&width=100",
    skillsOffered: ["JavaScript", "Node.js", "MongoDB"],
    skillsWanted: ["Python", "Machine Learning"],
    availability: "Evenings",
    isPublic: true,
    bio: "Full-stack developer passionate about learning new technologies",
    level: 8,
    xp: 1650,
    nextLevelXp: 2000,
    streak: 5,
    completedSwaps: 12,
    badges: ["first_swap", "quick_learner"],
    achievements: {
      first_swap: true,
      skill_master: false,
      quick_learner: true,
      mentor: false,
      social: false,
      knowledge: false,
    },
  })
  const [newSkill, setNewSkill] = useState("")
  const [swapRequests, setSwapRequests] = useState(mockSwapRequests)
  const [selectedUser, setSelectedUser] = useState(null)
  const [swapMessage, setSwapMessage] = useState("")

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.skillsOffered.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addSkill = (type: "offered" | "wanted") => {
    if (newSkill.trim()) {
      setProfile((prev) => ({
        ...prev,
        [type === "offered" ? "skillsOffered" : "skillsWanted"]: [
          ...prev[type === "offered" ? "skillsOffered" : "skillsWanted"],
          newSkill.trim(),
        ],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (type: "offered" | "wanted", skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      [type === "offered" ? "skillsOffered" : "skillsWanted"]: prev[
        type === "offered" ? "skillsOffered" : "skillsWanted"
      ].filter((skill) => skill !== skillToRemove),
    }))
  }

  const sendSwapRequest = (user: any, skillOffered: string, skillWanted: string) => {
    const newRequest = {
      id: Date.now(),
      from: "You",
      to: user.name,
      skillOffered,
      skillWanted,
      status: "pending",
      message: swapMessage,
      xpReward: Math.floor(Math.random() * 100) + 100,
    }
    setSwapRequests((prev) => [...prev, newRequest])
    setSwapMessage("")
    setSelectedUser(null)
  }

  const handleSwapRequest = (requestId: number, action: "accept" | "reject") => {
    setSwapRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: action === "accept" ? "accepted" : req } : req)),
    )

    if (action === "accept") {
      // Award XP for accepting a request
      const request = swapRequests.find((req) => req.id === requestId)
      if (request) {
        setProfile((prev) => ({
          ...prev,
          xp: prev.xp + request.xpReward,
        }))
      }
    }
  }

  const deleteSwapRequest = (requestId: number) => {
    setSwapRequests((prev) => prev.filter((req) => req.id !== requestId))
  }

  const xpProgress = (profile.xp / profile.nextLevelXp) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative z-10 p-4">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  SkillSwap Arena
                </h1>
                <p className="text-gray-400 mt-2">
                  Level up your skills, unlock achievements, dominate the leaderboard
                </p>
              </div>
            </div>

            {/* User Level & XP Bar */}
            <div className="flex items-center justify-center space-x-6 mt-6">
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-yellow-400" />
                <span className="text-lg font-semibold">Level {profile.level}</span>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex justify-between text-sm mb-1">
                  <span>{profile.xp} XP</span>
                  <span>{profile.nextLevelXp} XP</span>
                </div>
                <Progress value={xpProgress} className="h-3 level-progress" />
              </div>
              <div className="flex items-center space-x-2">
                <Flame className="h-5 w-5 text-orange-400" />
                <span className="text-lg font-semibold">{profile.streak} day streak</span>
              </div>
            </div>
          </header>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 backdrop-blur-sm">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-blue-500"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="browse"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-blue-500"
              >
                <Search className="h-4 w-4 mr-2" />
                Explore
              </TabsTrigger>
              <TabsTrigger
                value="requests"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-blue-500"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Requests
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-blue-500"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-500/30 card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-green-400">Skills Mastered</CardTitle>
                    <Brain className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      <AnimatedCounter value={profile.skillsOffered.length} />
                    </div>
                    <p className="text-xs text-green-300">+2 this month</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border-blue-500/30 card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-400">Active Swaps</CardTitle>
                    <Rocket className="h-4 w-4 text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      <AnimatedCounter value={swapRequests.filter((req) => req.status === "accepted").length} />
                    </div>
                    <p className="text-xs text-blue-300">ongoing exchanges</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-purple-500/30 card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-purple-400">Total XP</CardTitle>
                    <Star className="h-4 w-4 text-purple-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      <AnimatedCounter value={profile.xp} />
                    </div>
                    <p className="text-xs text-purple-300">+{Math.floor(Math.random() * 200) + 50} this week</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border-orange-500/30 card-hover">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-orange-400">Streak</CardTitle>
                    <Flame className="h-4 w-4 text-orange-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      <AnimatedCounter value={profile.streak} />
                    </div>
                    <p className="text-xs text-orange-300">days active</p>
                  </CardContent>
                </Card>
              </div>

              {/* Progress & Achievements */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                      Level Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center">
                    <ProgressRing progress={xpProgress} />
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-purple-400" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(profile.achievements).map(([key, unlocked]) => (
                        <AchievementBadge key={key} type={key as any} unlocked={unlocked} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-400" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {swapRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg">
                      <Avatar className="h-10 w-10 ring-2 ring-green-400/30">
                        <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                          {request.from[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {request.from === "You"
                            ? `You requested ${request.skillWanted} from ${request.to}`
                            : `${request.from} wants to learn ${request.skillWanted}`}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              request.status === "pending"
                                ? "default"
                                : request.status === "accepted"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="text-xs"
                          >
                            {request.status}
                          </Badge>
                          <span className="text-xs text-yellow-400">+{request.xpReward} XP</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="browse" className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by skill or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-600 focus:border-green-400"
                  />
                </div>
                <Button variant="outline" className="border-gray-600 hover:bg-gray-700 bg-transparent">
                  <Target className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredUsers.map((user) => (
                  <Card key={user.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 card-hover group">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12 ring-2 ring-green-400/30">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                              {user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-xs font-bold px-2 py-1 rounded-full">
                            {user.level}
                          </div>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-white">{user.name}</CardTitle>
                          <div className="flex items-center text-sm text-gray-400">
                            <MapPin className="h-3 w-3 mr-1" />
                            {user.location}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-yellow-400">{user.rating}</span>
                            </div>
                            <div className="flex items-center">
                              <Flame className="h-3 w-3 mr-1 text-orange-400" />
                              <span className="text-xs text-orange-400">{user.streak}d</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-green-400">Offers</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.skillsOffered.map((skill, index) => (
                            <Badge
                              key={index}
                              className="text-xs bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-blue-400">Wants</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.skillsWanted.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-blue-400/30 text-blue-300 hover:bg-blue-500/20"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Achievement Badges */}
                      <div className="flex space-x-1">
                        {user.badges.slice(0, 3).map((badge) => (
                          <AchievementBadge key={badge} type={badge as any} unlocked={true} className="scale-75" />
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {user.availability}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {user.completedSwaps} swaps
                        </div>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 glow-effect"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Zap className="h-4 w-4 mr-2" />
                            Challenge to Swap
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-800 border-gray-700">
                          <DialogHeader>
                            <DialogTitle className="text-white">Challenge {user.name} to a Skill Swap</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Choose your skills and start an epic learning journey
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label className="text-green-400">I can teach:</Label>
                              <Select>
                                <SelectTrigger className="bg-gray-700 border-gray-600">
                                  <SelectValue placeholder="Select a skill you offer" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-700 border-gray-600">
                                  {profile.skillsOffered.map((skill) => (
                                    <SelectItem key={skill} value={skill} className="text-white">
                                      {skill}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-blue-400">I want to learn:</Label>
                              <Select>
                                <SelectTrigger className="bg-gray-700 border-gray-600">
                                  <SelectValue placeholder="Select a skill they offer" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-700 border-gray-600">
                                  {user.skillsOffered.map((skill) => (
                                    <SelectItem key={skill} value={skill} className="text-white">
                                      {skill}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-purple-400">Challenge message:</Label>
                              <Textarea
                                placeholder="Write an epic challenge message..."
                                value={swapMessage}
                                onChange={(e) => setSwapMessage(e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-3 rounded-lg border border-yellow-500/30">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-2" />
                                <span className="text-sm text-yellow-400 font-medium">
                                  Potential XP Reward: +{Math.floor(Math.random() * 100) + 100}
                                </span>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              onClick={() => sendSwapRequest(user, profile.skillsOffered[0], user.skillsOffered[0])}
                              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                            >
                              <Rocket className="h-4 w-4 mr-2" />
                              Send Challenge
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <div className="grid gap-6">
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-green-400" />
                      Incoming Challenges
                    </CardTitle>
                    <CardDescription className="text-gray-400">Warriors who want to learn from you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {swapRequests
                      .filter((req) => req.to === "You")
                      .map((request) => (
                        <div key={request.id} className="gradient-border">
                          <div className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10 ring-2 ring-green-400/30">
                                  <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                                    {request.from[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-white">{request.from}</p>
                                  <p className="text-sm text-gray-400">
                                    Wants to learn{" "}
                                    <Badge className="bg-blue-500/20 text-blue-300">{request.skillWanted}</Badge> for{" "}
                                    <Badge className="bg-green-500/20 text-green-300">{request.skillOffered}</Badge>
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant={
                                    request.status === "pending"
                                      ? "default"
                                      : request.status === "accepted"
                                        ? "secondary"
                                        : "destructive"
                                  }
                                  className="pulse-glow"
                                >
                                  {request.status}
                                </Badge>
                                <span className="text-yellow-400 text-sm font-medium">+{request.xpReward} XP</span>
                              </div>
                            </div>
                            {request.message && (
                              <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
                                <p className="text-sm text-gray-300">{request.message}</p>
                              </div>
                            )}
                            {request.status === "pending" && (
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleSwapRequest(request.id, "accept")}
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Accept Challenge
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSwapRequest(request.id, "reject")}
                                  className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Decline
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Rocket className="h-5 w-5 mr-2 text-blue-400" />
                      Your Challenges
                    </CardTitle>
                    <CardDescription className="text-gray-400">Your quests to master new skills</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {swapRequests
                      .filter((req) => req.from === "You")
                      .map((request) => (
                        <div key={request.id} className="gradient-border">
                          <div className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10 ring-2 ring-blue-400/30">
                                  <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                                    {request.to[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-white">{request.to}</p>
                                  <p className="text-sm text-gray-400">
                                    You want to learn{" "}
                                    <Badge className="bg-blue-500/20 text-blue-300">{request.skillWanted}</Badge> for{" "}
                                    <Badge className="bg-green-500/20 text-green-300">{request.skillOffered}</Badge>
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant={
                                    request.status === "pending"
                                      ? "default"
                                      : request.status === "accepted"
                                        ? "secondary"
                                        : "destructive"
                                  }
                                  className="pulse-glow"
                                >
                                  {request.status}
                                </Badge>
                                {request.status === "pending" && (
                                  <Button size="sm" variant="ghost" onClick={() => deleteSwapRequest(request.id)}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                            {request.message && (
                              <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
                                <p className="text-sm text-gray-300">{request.message}</p>
                              </div>
                            )}
                            {request.status === "accepted" && (
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Enter Battle Arena
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-purple-400" />
                    Warrior Profile
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Customize your battle profile and skills arsenal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24 ring-4 ring-gradient-to-r from-green-400 to-blue-500">
                        <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                        <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-2xl">
                          <User className="h-12 w-12" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        LVL {profile.level}
                      </div>
                    </div>
                    <div className="flex-1">
                      <Button variant="outline" className="border-gray-600 hover:bg-gray-700 bg-transparent">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Change Avatar
                      </Button>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-gray-300">{profile.xp} Total XP</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Trophy className="h-4 w-4 text-purple-400" />
                          <span className="text-sm text-gray-300">{profile.completedSwaps} Completed Swaps</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Flame className="h-4 w-4 text-orange-400" />
                          <span className="text-sm text-gray-300">{profile.streak} Day Streak</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name" className="text-green-400">
                        Warrior Name
                      </Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white focus:border-green-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-blue-400">
                        Battle Location
                      </Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-purple-400">
                      Battle Cry
                    </Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell other warriors about your quest..."
                      className="bg-gray-700 border-gray-600 text-white focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="availability" className="text-orange-400">
                      Battle Schedule
                    </Label>
                    <Select
                      value={profile.availability}
                      onValueChange={(value) => setProfile((prev) => ({ ...prev, availability: value }))}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="Weekends" className="text-white">
                          Weekends
                        </SelectItem>
                        <SelectItem value="Evenings" className="text-white">
                          Evenings
                        </SelectItem>
                        <SelectItem value="Weekdays" className="text-white">
                          Weekdays
                        </SelectItem>
                        <SelectItem value="Flexible" className="text-white">
                          Flexible
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="public-profile"
                      checked={profile.isPublic}
                      onCheckedChange={(checked) => setProfile((prev) => ({ ...prev, isPublic: checked }))}
                    />
                    <Label htmlFor="public-profile" className="text-gray-300">
                      Make profile visible to other warriors
                    </Label>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-green-400 text-lg font-semibold flex items-center">
                        <Brain className="h-5 w-5 mr-2" />
                        Skills Arsenal
                      </Label>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {profile.skillsOffered.map((skill, index) => (
                          <Badge
                            key={index}
                            className="bg-green-500/20 text-green-300 border-green-500/30 flex items-center gap-2 px-3 py-1"
                          >
                            {skill}
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-red-400"
                              onClick={() => removeSkill("offered", skill)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Input
                          placeholder="Add a new skill to your arsenal..."
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addSkill("offered")}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        <Button onClick={() => addSkill("offered")} className="bg-green-500 hover:bg-green-600">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-blue-400 text-lg font-semibold flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Quest Objectives
                      </Label>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {profile.skillsWanted.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-blue-400/30 text-blue-300 flex items-center gap-2 px-3 py-1 hover:bg-blue-500/20"
                          >
                            {skill}
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-red-400"
                              onClick={() => removeSkill("wanted", skill)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Input
                          placeholder="Add a skill to your quest list..."
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addSkill("wanted")}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        <Button onClick={() => addSkill("wanted")} className="bg-blue-500 hover:bg-blue-600">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 glow-effect">
                    <Heart className="h-4 w-4 mr-2" />
                    Save Warrior Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
