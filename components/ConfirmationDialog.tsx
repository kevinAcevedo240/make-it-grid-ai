import React from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from './ui/button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  message: string;
  onReplicate: () => void;
  onHide: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, message, onReplicate, onHide }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onHide}>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col justify-start items-start mb-4">
            <h2 className="text-2xl">Confirm Action</h2>
            <span className="text-sm text-muted-foreground">
              {message}
            </span>
            <div className="mt-4">
              <Button className="mr-2" onClick={onReplicate}>Replicate</Button>
              <Button onClick={onHide}>Hide</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
