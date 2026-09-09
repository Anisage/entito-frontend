import React, { useCallback, useEffect, useRef, useState } from "react";
import { Upload, ImagePlus, Sparkles, X, AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import {
  runVisualSearch,
  clearVisualSearch,
  setSearchError,
  selectVisualSearchLoading,
  selectVisualSearchError,
} from "../../redux/slices/searchSlice";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB — matches backend cap

export interface UploadDropzoneProps {
  /**
   * `page` is the full-bleed treatment used on `/visual-search`.
   * `hero` is a compact variant suitable for landing-page heroes.
   */
  variant?: "page" | "hero";
  /**
   * Fires after the search thunk has been dispatched. The caller can use
   * this to navigate to the dedicated results page, close a modal, etc.
   * The component does not await the thunk — pending / loading state is
   * available from the slice via `selectVisualSearchLoading`.
   */
  onSubmitted?: () => void;
  /**
   * Optional preset file (e.g. selected from a sample-photo carousel).
   * When this prop changes to a new `File` the dropzone adopts it as the
   * current selection. Pass `null` to clear.
   */
  presetFile?: File | null;
  /**
   * Reset slice state when the component unmounts. Default `true`.
   * The Index hero sets this to `false` so the result lives long enough
   * for the user to read it on `/visual-search` after navigation.
   */
  clearOnUnmount?: boolean;
}

const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  variant = "page",
  onSubmitted,
  presetFile,
  clearOnUnmount = true,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectVisualSearchLoading);
  const error = useSelector(selectVisualSearchError);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clear slice state on unmount (configurable so the Index hero can hand
  // off to the VisualSearch route without wiping the just-dispatched
  // request).
  useEffect(() => {
    return () => {
      if (clearOnUnmount) dispatch(clearVisualSearch());
    };
  }, [dispatch, clearOnUnmount]);

  // Revoke any active blob URL when it changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const validateFile = (candidate: File): string | null => {
    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      return "Please choose a JPEG, PNG, or WebP image.";
    }
    if (candidate.size > MAX_BYTES) {
      return "Image is too large — keep it under 8 MB.";
    }
    return null;
  };

  const setSelectedFile = useCallback(
    (candidate: File) => {
      const issue = validateFile(candidate);
      if (issue) {
        dispatch(setSearchError(issue));
        return;
      }
      dispatch(clearVisualSearch());
      setFile(candidate);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(candidate);
      });
    },
    [dispatch]
  );

  // Adopt a preset file when the prop changes. Guard against re-running
  // on every render by comparing identity.
  useEffect(() => {
    if (presetFile) setSelectedFile(presetFile);
    // We intentionally exclude `setSelectedFile` from deps — its identity
    // changes only when `dispatch` does, which is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetFile]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setSelectedFile(dropped);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleBrowseClick = () => fileInputRef.current?.click();

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked) setSelectedFile(picked);
    // Reset the input so picking the same file twice still triggers onChange.
    e.target.value = "";
  };

  const handleClear = () => {
    setFile(null);
    dispatch(clearVisualSearch());
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  };

  const handleSubmit = () => {
    if (!file || loading) return;
    dispatch(runVisualSearch({ file }));
    onSubmitted?.();
  };

  const isHero = variant === "hero";
  const dropzonePadding = isHero ? "p-6" : "p-10";
  const dropzoneMinHeight = isHero ? "min-h-[220px]" : "min-h-[320px]";
  const previewMaxHeight = isHero ? "max-h-44" : "max-h-72";

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={!previewUrl ? handleBrowseClick : undefined}
        className={`relative rounded-card-lg border-2 border-dashed transition-colors text-center cursor-pointer flex flex-col items-center justify-center ${dropzonePadding} ${dropzoneMinHeight} ${
          isDragging
            ? "border-ink-1 bg-surface-2"
            : "border-line bg-surface hover:border-ink-muted"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="hidden"
          onChange={handleFileInputChange}
        />

        {previewUrl ? (
          <div className="w-full">
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Your query"
                className={`${previewMaxHeight} rounded-card mx-auto`}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                aria-label="Clear image"
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-ink-1 text-white flex items-center justify-center shadow-lg"
              >
                <X size={14} />
              </button>
            </div>
            {file?.name && (
              <p className="text-xs text-ink-muted mt-3 truncate">
                {file.name}
              </p>
            )}
          </div>
        ) : (
          <>
            <div
              className={`rounded-full bg-surface-2 flex items-center justify-center ${
                isHero ? "w-11 h-11 mb-3" : "w-14 h-14 mb-4"
              }`}
            >
              <Upload size={isHero ? 18 : 22} className="text-ink-1" />
            </div>
            <p
              className={`font-display text-ink-1 ${
                isHero ? "text-xl" : "text-2xl"
              }`}
            >
              Drop a photo here
            </p>
            <p
              className={`text-ink-muted mt-2 max-w-sm ${
                isHero ? "text-sm" : ""
              }`}
            >
              Or click to browse. JPEG, PNG, or WebP up to 8 MB.
            </p>
            {!isHero && (
              <span className="btn-pill btn-ghost mt-6 inline-flex">
                <ImagePlus size={14} />
                Choose a photo
              </span>
            )}
          </>
        )}
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-3 rounded-card bg-coral/10 border border-coral/30 px-4 py-3 text-sm text-ink-1">
          <AlertCircle size={16} className="mt-0.5 text-coral shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!file || loading}
          className="btn-pill btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles size={14} />
          {loading ? "Searching…" : "Find matches"}
        </button>
        {file && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="btn-pill btn-ghost"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadDropzone;
