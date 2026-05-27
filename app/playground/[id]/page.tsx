"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
//import LoadingStep from "@/modules/playground/components/loader";
import PlaygroundEditor from "@/modules/playground/components/playground-editor";
import { TemplateFileTree } from "@/modules/playground/components/playground-explorer";
//import ToggleAI from "@/modules/playground/components/toggle-ai";
//import { useAISuggestion } from "@/modules/playground/hooks/useAISuggestion";
import { useFileExplorer } from "@/modules/playground/hooks/useFileExplorer";
import { usePlayground } from "@/modules/playground/hooks/usePlayground";
import { findFilePath } from "@/modules/playground/lib";
import {
  TemplateFile,
  TemplateFolder,
} from "@/modules/playground/lib/path-to-json";
import { useWebContainer } from "@/modules/webcontainers/hooks/useWebContainer";
import WebContainerPreview from "@/modules/webcontainers/components/webcontainer-preview";

import { Monaco } from "@monaco-editor/react";
import { TooltipContent } from "@radix-ui/react-tooltip";
import {
  AlertCircle,
  Bot,
  FileText,
  FolderOpen,
  Save,
  Settings,
  X,
} from "lucide-react";
import { editor } from "monaco-editor";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";


const MainPlaygroundPage = () => {
    const {id} = useParams<{id: string}>();
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);

    const {playgroundData, templateData, isLoading, error, loadPlayground} = usePlayground(id);

    const{
        selectedFileId,
        closeAllFiles,
        openFile,
        openFiles,
        setTemplateData,
        setPlaygroundId,
        setSelectedFileId,
        setOpenFiles,
        closeFile,


    } = useFileExplorer();

    const {
      serverUrl,
      instance,
      writeFileSync,
      isLoading: containerLoading,
      error: containerError,
                       // @ts-ignore
    } = useWebContainer({templateData});

    useEffect(() => {setPlaygroundId(id)}, [id, setPlaygroundId]);

    useEffect(() => {
        if(templateData && !openFiles.length){
            setTemplateData(templateData);
        }
    },[templateData, setTemplateData, openFiles.length])


    const activeFile = openFiles.find((file) => file.id === selectedFileId) ; 
    const hasUnsavedChanges = openFiles.some((file) => file.hasUnsavedChanges);

    const handleFileSelect = (file:TemplateFile) => {
        openFile(file);
    }
    return (
        <TooltipProvider>
            <>
            <TemplateFileTree
            data={templateData!}
               onFileSelect={handleFileSelect}
               selectedFile={activeFile}
               title="File Explorer"
               onAddFile={()=>{}}//wrappedHandleAddFile} 
               onAddFolder={()=>{}}//wrappedHandleAddFolder}
               onDeleteFile={()=>{}}//wrappedHandleDeleteFile}
               onRenameFile={()=>{}}//wrappedHandleRenameFile}
               onDeleteFolder={()=>{}}//wrappedHandleDeleteFolder}
               onRenameFolder={()=>{}}//wrappedHandleRenameFolder}

            />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />

                    <div className="flex flex-1 items-center gap-2">
                        <div className="flex flex-col flex-1">
                            <h1 className="text-sm font-medium">
                                {playgroundData?.title || "Code Playground"}

                            </h1>
                            <p className="text-xs text-muted-foreground">
                                {openFiles.length} File(s) Open
                                {hasUnsavedChanges && " - Unsaved Changes"}
                                 
                            </p>
                            </div>

                            <div className="flex items-center gap-1">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={()=>{}}
                                        disabled={!activeFile || !activeFile.hasUnsavedChanges}

                                        >
                                            <Save className="h-4 w-4"/>

                                        </Button>
                                        
                                    </TooltipTrigger>
                                    <TooltipContent>Save (Ctrl+S)</TooltipContent>
                                    
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={()=>{}}
                                        disabled={!hasUnsavedChanges}

                                        >
                                            <Save className="h-4 w-4"/> All

                                        </Button>
                                        
                                    </TooltipTrigger>
                                    <TooltipContent>Save All (Ctrl+Shift+S)</TooltipContent>
                                    
                                </Tooltip>
                                <Button variant={"default"} size={"icon"}>
                                    <Bot className="size-4"/>
                                </Button>

                                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                    >
                      {isPreviewVisible ? "Hide" : "Show"} Preview
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={closeAllFiles}>
                      Close All Files
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                            </div>
                            </div> 

                    </header>
                <div className="h-[calc(100vh-4rem)]">
            {
            openFiles.length > 0 ? (
              <div className="h-full flex flex-col">
                <div className="border-b bg-muted/30">
                  <Tabs
                    value={selectedFileId ?? ""}
                    onValueChange={setSelectedFileId}
                  >
                    <div className="flex items-center justify-between px-4 py-2">
                      <TabsList className="h-8 bg-transparent p-0">
                        {openFiles.map((file) => (
                          <TabsTrigger
                            key={file.id}
                            value={file.id}
                            className="relative h-8 px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm group"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="size-3" />
                              <span>
                                {file.filename}.{file.fileExtension}
                              </span>
                              {file.hasUnsavedChanges && (
                                <span className="size-2 rounded-full bg-orange-500 animate-pulse" />
                              )}
                              <span
                                className="ml-3 size-4 hover:bg-destructive hover:text-destructive-foreground rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  closeFile(file.id);
                                }}
                              >
                                <X className="size-4" />
                              </span>
                            </div>
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {openFiles.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={closeAllFiles}
                          className="h-6 px-2 text-xs"
                        >
                          Close All
                        </Button>
                      )}
                    </div>
                  </Tabs>
                </div>
                <div className="flex-1">
                    <ResizablePanelGroup
                      direction="horizontal"
                    className="h-full">
                  
                    <ResizablePanel
  defaultSize={
    isPreviewVisible
      ? 50
      : 100
  }
>
  {activeFile ? (
    <PlaygroundEditor
      selectedFile={activeFile}
      content={
        activeFile.content || ""
      }
      onContentChange={() => {}}

      suggestion={null}

      suggestionLoading={false}

      suggestionPosition={null}

      onAcceptSuggestion={() => {}}

      onRejectSuggestion={() => {}}

      onTriggerSuggestion={() => {}}
    />
  ) : null}
</ResizablePanel>

{
  isPreviewVisible && (
    <>
    <ResizableHandle/>
    <ResizablePanel defaultSize={50}>
      <WebContainerPreview
      templateData={templateData}
      instance={instance}
      writeFileSync={writeFileSync}
      isLoading={containerLoading}
      error={containerError}
      serverUrl={serverUrl!}
      forceResetup={false}
      />

      </ResizablePanel>
    </>
  )
}

                    
                      </ResizablePanelGroup>
                    </div>

                </div>
                ) : (
                    <div className="flex flex-col h-full items-center justify-center text-muted-foreground gap-4">
                <FileText className="h-16 w-16 text-gray-300" />
                <div className="text-center">
                  <p className="text-lg font-medium">No files opened</p>
                  <p className="text-sm text-gray-500">
                    Select a file from the sidebar to start editing
                  </p>
                </div>
              </div>
                )}
                </div>   
            
            </SidebarInset>
            </>
        </TooltipProvider>
    );
};

export default MainPlaygroundPage;





