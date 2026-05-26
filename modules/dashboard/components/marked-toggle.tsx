"use client"

import { Button } from "@/components/ui/button"

import {
  StarIcon,
  StarOffIcon,
} from "lucide-react"

import { toggleStarMarked } from "../actions"

import {
  useState,
  useEffect,
  forwardRef,
} from "react"

import { toast } from "sonner"

import type React from "react"

interface MarkedToggleButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  markedForRevision?: boolean
  id: string
}

export const MarkedToggleButton =
  forwardRef<
    HTMLButtonElement,
    MarkedToggleButtonProps
  >(
    (
      {
        markedForRevision,
        id,
        onClick,
        className,
        children,
        ...props
      },
      ref
    ) => {
      const [isMarked, setIsMarked] =
        useState(
          markedForRevision || false
        )

      useEffect(() => {
        setIsMarked(
          markedForRevision || false
        )
      }, [markedForRevision])

      const handleToggle = async (
        event: React.MouseEvent<HTMLButtonElement>
      ) => {
        onClick?.(event)

        const newIsMarkedState =
          !isMarked

        setIsMarked(newIsMarkedState)

        try {
          const res =
            await toggleStarMarked(
              id,
              newIsMarkedState
            )

          const {
            success,
            error,
            isMarked,
          } = res

          if (
            isMarked &&
            !error &&
            success
          ) {
            toast.success(
              "Added to Favorites successfully"
            )
          } else {
            toast.success(
              "Removed from Favorites successfully"
            )
          }
        } catch (error) {
          console.error(
            "Failed to toggle mark for revision:",
            error
          )

          setIsMarked(
            !newIsMarkedState
          )

          toast.error(
            "Something went wrong"
          )
        }
      }

      return (
        <Button
          ref={ref}
          variant="ghost"
          className={`flex items-center justify-start w-full px-2 py-1.5 text-sm rounded-md cursor-pointer ${className}`}
          onClick={handleToggle}
          {...props}
        >
          {isMarked ? (
            <StarIcon className="text-red-500 mr-2 h-4 w-4" />
          ) : (
            <StarOffIcon className="text-gray-500 mr-2 h-4 w-4" />
          )}

          {children ||
            (isMarked
              ? "Remove Favorite"
              : "Add to Favorites")}
        </Button>
      )
    }
  )

MarkedToggleButton.displayName =
  "MarkedToggleButton"

export default MarkedToggleButton