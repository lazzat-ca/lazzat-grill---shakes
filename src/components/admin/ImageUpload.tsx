// src/components/admin/ImageUpload.tsx
// Image upload field with 45 KB hard limit and automatic compression.
import { useRef, useState } from "react";
import { processImageUpload, MAX_IMAGE_BYTES } from "@/lib/image-utils";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;          // current image URL or data URL
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export const ImageUpload = ({
  value,
  onChange,
  label = "Image",
  className,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!inputRef.current) inputRef.current!.value = "";
    if (!file) return;

    setError(null);
    setProcessing(true);
    try {
      const dataUrl = await processImageUpload(file);
      onChange(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setProcessing(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    onChange("");
    setError(null);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-foreground">{label}</p>

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="h-32 w-48 object-cover rounded-lg border border-primary/20"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 rounded-full bg-destructive text-destructive-foreground p-0.5 shadow"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={processing}
          className={cn(
            "flex h-32 w-48 flex-col items-center justify-center gap-2 rounded-lg",
            "border-2 border-dashed border-primary/30 hover:border-primary/60",
            "text-muted-foreground hover:text-foreground transition-colors",
            processing && "opacity-50 cursor-wait"
          )}
        >
          <UploadCloud size={24} />
          <span className="text-xs text-center px-2">
            {processing ? "Compressing…" : `Click to upload\n(max ${Math.round(MAX_IMAGE_BYTES / 1024)} KB)`}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
        aria-label="Upload image"
      />

      {error && (
        <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/30 rounded px-2 py-1">
          {error}
        </p>
      )}

      {/* Allow pasting a URL directly */}
      {!value && (
        <div className="flex gap-2 mt-1">
          <input
            type="url"
            placeholder="Or paste image URL…"
            className="flex-1 h-8 rounded-md border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            onBlur={(e) => {
              const url = e.target.value.trim();
              if (url) {
                onChange(url);
                e.target.value = "";
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 text-xs px-2"
            onClick={(e) => {
              const input = (e.currentTarget.previousSibling as HTMLInputElement);
              const url = input?.value.trim();
              if (url) {
                onChange(url);
                input.value = "";
              }
            }}
          >
            Use URL
          </Button>
        </div>
      )}
    </div>
  );
};
