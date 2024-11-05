'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface FilterProps {
  onFilterChange: (filters: {
    intensity: string[]
    duration: string[]
    day: string[]
  }) => void
}

export default function ClassFilters({ onFilterChange }: FilterProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedFilters, setSelectedFilters] = React.useState({
    intensity: [] as string[],
    duration: [] as string[],
    day: [] as string[],
  })

  const intensityOptions = ["low", "medium", "high"];
  const durationOptions = ["35 minutes", "45 minutes", "1 hour"];
  const dayOptions = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const handleFilterChange = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => {
      const newFilters = {
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value]
      }
      onFilterChange(newFilters)
      return newFilters
    })
  }

  const clearFilters = () => {
    setSelectedFilters({
      intensity: [],
      duration: [],
      day: [],
    })
    onFilterChange({
      intensity: [],
      duration: [],
      day: [],
    })
  }

  const totalFilters = Object.values(selectedFilters).reduce(
    (acc, curr) => acc + curr.length,
    0
  )

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mb-8">
      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-zinc-900 text-white border-red-600 hover:bg-zinc-800 flex items-center"
            >
              <Filter className="mr-2 h-4 w-4 text-red-600" />
              Filters
              {totalFilters > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-red-600 text-white"
                >
                  {totalFilters}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-zinc-900 text-white border-red-600">
            <DropdownMenuLabel>Intensity</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-700" />
            {intensityOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option}
                checked={selectedFilters.intensity.includes(option)}
                onCheckedChange={() => handleFilterChange('intensity', option)}
                className="hover:bg-zinc-800 hover:text-white"
              >
                {option}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuLabel className="mt-2">Duration</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-700" />
            {durationOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option}
                checked={selectedFilters.duration.includes(option)}
                onCheckedChange={() => handleFilterChange('duration', option)}
                className="hover:bg-zinc-800 hover:text-white"
              >
                {option}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuLabel className="mt-2">Day</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-700" />
            {dayOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option}
                checked={selectedFilters.day.includes(option)}
                onCheckedChange={() => handleFilterChange('day', option)}
                className="hover:bg-zinc-800 hover:text-white"
              >
                {option}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <AnimatePresence>
          {totalFilters > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-500"
              >
                <X className="mr-2 h-4 w-4" />
                Clear filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(selectedFilters).map(([category, values]) =>
            values.map((value) => (
              <motion.div
                key={`${category}-${value}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-zinc-800 text-white hover:bg-zinc-700 cursor-pointer"
                  onClick={() => handleFilterChange(category as keyof typeof selectedFilters, value)}
                >
                  {value}
                  <X className="ml-2 h-3 w-3" />
                </Badge>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}