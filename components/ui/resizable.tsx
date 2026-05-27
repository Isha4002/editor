"use client";

import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

function ResizablePanelGroup({
  className,
  ...props
}: any) {
  return (
    <ResizablePrimitive.PanelGroup
      className={cn(
        "flex h-full w-full",
        className
      )}
      {...props}
    />
  );
}

function ResizablePanel(
  props: any
) {
  return (
    <ResizablePrimitive.Panel
      {...props}
    />
  );
}

function ResizableHandle({
  className,
  ...props
}: any) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      className={cn(
        "w-1 bg-border",
        className
      )}
      {...props}
    />
  );
}

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
};