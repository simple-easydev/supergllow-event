import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (videoUrl: string) => void;
  currentVideo: string | null;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentVideo,
}) => {
  const [videoUrl, setVideoUrl] = useState(currentVideo || '');

  const handleSave = () => {
    if (videoUrl.trim()) {
      onSave(videoUrl);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add video</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
            <Camera size={80} className="text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-4">
              Record a special message for your party invite
            </p>
            <Button variant="secondary" className="mx-auto">
              Start recording
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <div>
            <Input
              placeholder="https://youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Add a YouTube or Vimeo link
            </p>
          </div>

          <Button onClick={handleSave} disabled={!videoUrl.trim()} className="w-full">
            Add Video
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
