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
    <Dialog open={isOpen} >
      <DialogContent className="md:max-w-[35rem] max-w-[20rem] rounded-lg">
          <DialogHeader>
            <div className="flex flex-col justify-start items-start mb-4">
              <h2 className="text-2xl">Confirm Action</h2>
              <span className="text-sm text-muted-foreground flex justify-start items-start">
                {message}
              </span>
            </div>
          </DialogHeader>
          <div className="flex justify-center items-center gap-3">
            <Button className="text-lg" onClick={onReplicate}>
              Replicate
            </Button>
            <Button onClick={onHide} className="text-lg">
              Hide
            </Button>
          </div>
        </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
