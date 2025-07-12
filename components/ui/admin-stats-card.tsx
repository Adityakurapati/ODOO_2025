"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "./animated-counter"

interface AdminStatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  trend?: string
  color: string
  badge?: string
}

export function AdminStatsCard({ title, value, icon, trend, color, badge }: AdminStatsCardProps) {
  return (
    <Card className={`bg-gradient-to-br ${color} border-opacity-30 card-hover`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
        <div className="text-white">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">
          <AnimatedCounter value={value} />
        </div>
        <div className="flex items-center justify-between mt-2">
          {trend && <p className="text-xs text-white/80">{trend}</p>}
          {badge && (
            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
              {badge}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
