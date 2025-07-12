"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, AlertTriangle } from "lucide-react"

interface ReportCardProps {
  report: {
    id: number
    type: string
    content: string
    reportedBy: string
    reportedUser: string
    reason: string
    status: string
    timestamp: string
  }
  onAction: (id: number, action: "approve" | "reject") => void
  onBanUser: (user: string) => void
}

export function ReportCard({ report, onAction, onBanUser }: ReportCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "resolved":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "dismissed":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "skill":
        return "🎯"
      case "profile":
        return "👤"
      case "message":
        return "💬"
      default:
        return "⚠️"
    }
  }

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 card-hover">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getTypeIcon(report.type)}</div>
            <div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs border-purple-400/30 text-purple-300">
                  {report.type}
                </Badge>
                <Badge className={`text-xs ${getStatusColor(report.status)}`}>{report.status}</Badge>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Reported by <span className="text-blue-400">{report.reportedBy}</span> • {report.timestamp}
              </p>
            </div>
          </div>
          <AlertTriangle className="h-5 w-5 text-red-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
          <p className="text-sm text-gray-300 mb-2">
            <span className="text-red-400 font-medium">Reported User:</span> {report.reportedUser}
          </p>
          <p className="text-sm text-gray-300 mb-2">
            <span className="text-orange-400 font-medium">Reason:</span> {report.reason}
          </p>
          <p className="text-sm text-gray-300">
            <span className="text-yellow-400 font-medium">Content:</span> "{report.content}"
          </p>
        </div>

        {report.status === "pending" && (
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={() => onAction(report.id, "approve")}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <Check className="h-4 w-4 mr-1" />
              Remove Content
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAction(report.id, "reject")}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <X className="h-4 w-4 mr-1" />
              Dismiss
            </Button>
            <Button
              size="sm"
              onClick={() => onBanUser(report.reportedUser)}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            >
              🔨 Ban User
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
