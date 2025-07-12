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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Star, MapPin, Clock, User, Plus, X, Check, MessageSquare } from "lucide-react"

// Mock data
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
    isPublic: true,
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
    isPublic: true,
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
    isPublic: true,
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
  },
  {
    id: 2,
    from: "You",
    to: "Emma Davis",
    skillOffered: "JavaScript",
    skillWanted: "Photoshop",
    status: "accepted",
    message: "Looking forward to learning Photoshop from you!",
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
    }
    setSwapRequests((prev) => [...prev, newRequest])
    setSwapMessage("")
    setSelectedUser(null)
  }

  const handleSwapRequest = (requestId: number, action: "accept" | "reject") => {
    setSwapRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: action === "accept" ? "accepted" : "rejected" } : req,
      ),
    )
  }

  const deleteSwapRequest = (requestId: number) => {
    setSwapRequests((prev) => prev.filter((req) => req.id !== requestId))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Swap Platform</h1>
          <p className="text-gray-600">Connect, learn, and grow by exchanging skills with others</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="browse">Browse Users</TabsTrigger>
            <TabsTrigger value="requests">Swap Requests</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Skills Offered</CardTitle>
                  <Badge variant="secondary">{profile.skillsOffered.length}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {profile.skillsOffered.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {profile.skillsOffered.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{profile.skillsOffered.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Swaps</CardTitle>
                  <Badge variant="secondary">{swapRequests.filter((req) => req.status === "accepted").length}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{swapRequests.filter((req) => req.status === "accepted").length}</p>
                  <p className="text-xs text-muted-foreground">ongoing exchanges</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                  <Badge variant="secondary">{swapRequests.filter((req) => req.status === "pending").length}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{swapRequests.filter((req) => req.status === "pending").length}</p>
                  <p className="text-xs text-muted-foreground">awaiting response</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {swapRequests.slice(0, 3).map((request) => (
                  <div key={request.id} className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{request.from[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {request.from === "You"
                          ? `You requested ${request.skillWanted} from ${request.to}`
                          : `${request.from} wants to learn ${request.skillWanted}`}
                      </p>
                      <p className="text-sm text-muted-foreground">Status: {request.status}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by skill or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{user.name}</CardTitle>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {user.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-green-700">Offers</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.skillsOffered.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-blue-700">Wants</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.skillsWanted.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-blue-200 text-blue-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {user.availability}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {user.rating}
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" onClick={() => setSelectedUser(user)}>
                          Request Skill Swap
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Request Skill Swap with {user.name}</DialogTitle>
                          <DialogDescription>Choose what you can offer and what you'd like to learn</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>I can teach:</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a skill you offer" />
                              </SelectTrigger>
                              <SelectContent>
                                {profile.skillsOffered.map((skill) => (
                                  <SelectItem key={skill} value={skill}>
                                    {skill}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>I want to learn:</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a skill they offer" />
                              </SelectTrigger>
                              <SelectContent>
                                {user.skillsOffered.map((skill) => (
                                  <SelectItem key={skill} value={skill}>
                                    {skill}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Message (optional):</Label>
                            <Textarea
                              placeholder="Introduce yourself and explain what you're looking for..."
                              value={swapMessage}
                              onChange={(e) => setSwapMessage(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={() => sendSwapRequest(user, profile.skillsOffered[0], user.skillsOffered[0])}
                          >
                            Send Request
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
              <Card>
                <CardHeader>
                  <CardTitle>Incoming Requests</CardTitle>
                  <CardDescription>People who want to learn from you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {swapRequests
                    .filter((req) => req.to === "You")
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>{request.from[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{request.from}</p>
                              <p className="text-sm text-gray-500">
                                Wants to learn <Badge variant="outline">{request.skillWanted}</Badge> for{" "}
                                <Badge variant="secondary">{request.skillOffered}</Badge>
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              request.status === "pending"
                                ? "default"
                                : request.status === "accepted"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {request.status}
                          </Badge>
                        </div>
                        {request.message && (
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm">{request.message}</p>
                          </div>
                        )}
                        {request.status === "pending" && (
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={() => handleSwapRequest(request.id, "accept")}>
                              <Check className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleSwapRequest(request.id, "reject")}>
                              <X className="h-4 w-4 mr-1" />
                              Decline
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Outgoing Requests</CardTitle>
                  <CardDescription>Your requests to learn from others</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {swapRequests
                    .filter((req) => req.from === "You")
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>{request.to[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{request.to}</p>
                              <p className="text-sm text-gray-500">
                                You want to learn <Badge variant="outline">{request.skillWanted}</Badge> for{" "}
                                <Badge variant="secondary">{request.skillOffered}</Badge>
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
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm">{request.message}</p>
                          </div>
                        )}
                        {request.status === "accepted" && (
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Start Conversation
                          </Button>
                        )}
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your profile information and skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Photo</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location (optional)</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell others about yourself..."
                  />
                </div>

                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Select
                    value={profile.availability}
                    onValueChange={(value) => setProfile((prev) => ({ ...prev, availability: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Weekends">Weekends</SelectItem>
                      <SelectItem value="Evenings">Evenings</SelectItem>
                      <SelectItem value="Weekdays">Weekdays</SelectItem>
                      <SelectItem value="Flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="public-profile"
                    checked={profile.isPublic}
                    onCheckedChange={(checked) => setProfile((prev) => ({ ...prev, isPublic: checked }))}
                  />
                  <Label htmlFor="public-profile">Make profile public</Label>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Skills I Offer</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.skillsOffered.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill("offered", skill)} />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSkill("offered")}
                      />
                      <Button onClick={() => addSkill("offered")}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Skills I Want to Learn</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.skillsWanted.map((skill, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          {skill}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill("wanted", skill)} />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSkill("wanted")}
                      />
                      <Button onClick={() => addSkill("wanted")}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Save Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
