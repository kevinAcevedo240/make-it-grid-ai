import React, { useContext, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import CopyButton from '../CopyButton';
import ConfirmationDialog from '../ConfirmationDialog';
import GeneratedCodeModal from '../GeneratedCodeModal';
import { GridContext } from '@/context/useGridContext';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '../ui/button';

const CopyCode: React.FC = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  const { saveToLocalStorage } = useContext(GridContext);

  const loadFromLocalStorage = (mode: 'desktop' | 'mobile') => {
    const storedData = localStorage.getItem(`grid-${mode}`);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  };

  const handleOpenModal = () => {
    if (isDesktopOrLaptop) {
      document.getElementById("desktopDialogTrigger")?.click();
    } else if (isMobile) {
      document.getElementById("mobileDrawerTrigger")?.click();
    }
  };

  const handleCopyClick = () => {
    const mobileData = loadFromLocalStorage('mobile');
    const desktopData = loadFromLocalStorage('desktop');

    if (mobileData.layout.length === 0 && desktopData.layout.length > 0) {
      setConfirmMessage('The mobile layout is empty. Do you want to replicate the desktop layout to mobile or hide it?');
      setIsConfirmDialogOpen(true);
    } else if (desktopData.layout.length === 0 && mobileData.layout.length > 0) {
      setConfirmMessage('The desktop layout is empty. Do you want to replicate the mobile layout to desktop or hide it?');
      setIsConfirmDialogOpen(true);
    } else
    handleOpenModal();
  };

  const handleReplicate = () => {
    const mobileData = loadFromLocalStorage('mobile');
    const desktopData = loadFromLocalStorage('desktop');

    if (mobileData.layout.length === 0 && desktopData.layout.length > 0) {
      saveToLocalStorage('mobile', { rows: desktopData.rows, cols: desktopData.cols, gap: desktopData.gap, layout: desktopData.layout });
    } else if (desktopData.layout.length === 0 && mobileData.layout.length > 0) {
      saveToLocalStorage('desktop', { rows: mobileData.rows, cols: mobileData.cols, gap: mobileData.gap, layout: mobileData.layout });
    }

    handleOpenModal();
    setIsConfirmDialogOpen(false);
  };

  const handleHide = () => {
    handleOpenModal();
    setIsConfirmDialogOpen(false);
  };

  return (
    <div>
      <CopyButton onClick={handleCopyClick} />

      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        message={confirmMessage}
        onReplicate={handleReplicate}
        onHide={handleHide}
      />

      <GeneratedCodeModal />
    </div>
  );
};

export default CopyCode;