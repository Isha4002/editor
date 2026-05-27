import { TemplateFolder } from "@/modules/playground/lib/path-to-json";
import { WebContainer } from "@webcontainer/api";
import { useEffect, useState, useCallback } from "react";

interface useWebContainerProps {
  templateData: TemplateFolder;
}

interface useWebContainerReturn {
  serverUrl: string | null;
  isLoading: boolean;
  error: string | null;
  instance: WebContainer | null;
  writeFileSync: (path: string, content: string) => Promise<void>;
  destroy: () => void;
}

export const useWebContainer = ({
  templateData,
}: useWebContainerProps): useWebContainerReturn => {
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [instance, setInstance] = useState<WebContainer | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initializeWebContainer() {
    //   setIsLoading(true);
    //   setError(null);
      try {
        const webContainerInstance = await WebContainer.boot();
        if (!mounted) return;

        setInstance(webContainerInstance);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to start WebContainer", error);
        if (mounted) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to start WebContainer"
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeWebContainer();

    return () => {
      mounted = false;
      if (instance) {
        instance.teardown();
      }
    };
  }, []);

  const writeFileSync = useCallback(async (path: string, content: string): Promise<void> => {
    if (!instance) {
      throw new Error("WebContainer instance is not initialized");
    }

    try {
      const pathParts = path.split("/");
      const folderPath = pathParts.slice(0, -1).join("/");

      if (folderPath) {
        await instance.fs.mkdir(folderPath, { recursive: true });
      }
      await instance.fs.writeFile(path, content);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to write file";
      console.error(`Failed to write file at ${path}:`, err);
      throw new Error(`Failed to write file at ${path}: ${errorMessage}`);
    }
  }, [instance]);

  const destroy = useCallback(() => {
    if (instance) {
      instance.teardown();
      setInstance(null);
      setServerUrl(null);
    }
  }, [instance]);

  return {
    serverUrl,
    isLoading,
    error,
    instance,
    writeFileSync,
    destroy,
  };
};