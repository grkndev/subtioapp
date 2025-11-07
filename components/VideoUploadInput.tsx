'use client';

import { useState, useRef } from 'react';
import { FileVideo, Upload, X, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { cn } from '@/lib/utils';

interface VideoMetadata {
  name: string;
  duration: number; // saniye cinsinden
  thumbnail: string; // base64 veya blob URL
  size: number;
  type: string;
}

interface VideoUploadInputProps {
  onVideoSelect?: (file: File, metadata: VideoMetadata) => void;
  onUpload?: (file: File, metadata: VideoMetadata) => Promise<void>;
  className?: string;
  maxSize?: number; // MB cinsinden
  acceptedFormats?: string[];
}

export default function VideoUploadInput({
  onVideoSelect,
  onUpload,
  className,
  maxSize = 500,
  acceptedFormats = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
}: VideoUploadInputProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return 'Geçersiz dosya formatı. Lütfen video dosyası seçin.';
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      return `Dosya boyutu ${maxSize}MB'dan küçük olmalıdır.`;
    }

    return null;
  };

  const extractVideoMetadata = async (file: File): Promise<VideoMetadata> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      video.preload = 'metadata';
      video.muted = true;
      
      video.onloadedmetadata = () => {
        // Video süresini al
        const duration = video.duration;
        
        // Thumbnail için video'yu ortadan yakala
        video.currentTime = duration / 2;
      };

      video.onseeked = () => {
        // Canvas boyutunu ayarla
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Video frame'ini canvas'a çiz
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Thumbnail'i base64'e çevir
        const thumbnail = canvas.toDataURL('image/jpeg', 0.8);

        // Metadata'yı oluştur
        const metadata: VideoMetadata = {
          name: file.name,
          duration: video.duration,
          thumbnail: thumbnail,
          size: file.size,
          type: file.type
        };

        // Temizlik
        URL.revokeObjectURL(video.src);

        resolve(metadata);
      };

      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        reject(new Error('Video metadata çıkarılamadı'));
      };

      // Video'yu yükle
      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (file: File) => {
    setError(null);
    setIsProcessing(true);
    
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setIsProcessing(false);
      return;
    }

    try {
      const videoMetadata = await extractVideoMetadata(file);
      setSelectedFile(file);
      setMetadata(videoMetadata);
      onVideoSelect?.(file, videoMetadata);
    } catch (err) {
      setError('Video işlenirken hata oluştu');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !metadata || !onUpload) return;

    setIsUploading(true);
    setError(null);

    try {
      await onUpload(selectedFile, metadata);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yükleme sırasında hata oluştu');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setMetadata(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isProcessing) {
    return (
      <div className={cn('w-full', className)}>
        <div className="border-2 border-dashed rounded-lg p-8 bg-muted/50">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-sm text-muted-foreground">Video işleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedFile && metadata) {
    return (
      <div className={cn('w-full', className)}>
        <div className="border-2 border-dashed rounded-lg overflow-hidden bg-muted/50">
          {/* Thumbnail */}
          <div className="relative w-full aspect-video bg-black">
            <img
              src={metadata.thumbnail}
              alt="Video thumbnail"
              className="w-full h-full object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={handleRemove}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Metadata */}
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Video Adı</p>
                <p className="font-medium text-sm truncate">{metadata.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Süre</p>
                  <p className="font-medium text-sm">{formatDuration(metadata.duration)}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FileVideo className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Boyut</p>
                  <p className="font-medium text-sm">{formatFileSize(metadata.size)}</p>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-xs text-destructive">{error}</p>
            )}

            {onUpload && (
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full"
              >
                {isUploading ? 'Yükleniyor...' : 'Yükle'}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats.join(',')}
        onChange={handleFileChange}
        className="hidden"
        id="video-upload-input"
      />

      <label
        htmlFor="video-upload-input"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          'block cursor-pointer',
          isDragging && 'opacity-60'
        )}
      >
        <Empty className={cn(
          'border-2 border-dashed rounded-lg transition-colors',
          isDragging ? 'border-primary bg-primary/5' : 'hover:border-primary/50 hover:bg-muted/50'
        )}>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileVideo className="w-8 h-8" />
            </EmptyMedia>
            <EmptyTitle>Upload your video</EmptyTitle>
            <EmptyDescription>
              Upload files to your video to add subtitles
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button type="button" variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </EmptyContent>
          {error && (
            <p className="text-xs text-destructive mt-2">{error}</p>
          )}
        </Empty>
      </label>
    </div>
  );
}