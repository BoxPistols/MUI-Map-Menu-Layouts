import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { styled, Theme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import './index.css';

// スタイル付きコンポーネントの作成
const BlurredBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  backdropFilter: 'blur(4px)',
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  position: 'relative',
}));

const StyledDrawer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
}));

const StyledModal = styled(Modal)(() => ({
  // 必要に応じて追加のスタイルを設定
}));

// グローバルスタイルを定義して Modal の背景を完全に透明にする
const ModalOverlayStyles = (
  <GlobalStyles
    styles={{
      '.MuiModal-backdrop': {
        backgroundColor: 'transparent !important',
      },
    }}
  />
);

interface Action {
  icon: React.ReactNode;
  name: string;
  action: () => void;
}

export default function AdvancedLauncherMenu() {
  const [open, setOpen] = useState(false);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  const actions: Action[] = [
    {
      icon: <ListIcon />,
      name: 'Bottom Drawer',
      action: () => setBottomDrawerOpen(true),
    },
    {
      icon: <EditIcon />,
      name: 'Right Drawer',
      action: () => setRightDrawerOpen(true),
    },
    {
      icon: <SettingsIcon />,
      name: 'Modal',
      action: () => setModalOpen(true),
    },
  ];

  const handleAction = (actionFunc: () => void) => {
    actionFunc();
    setOpen(false);
  };

  return (
    <>
      {ModalOverlayStyles}
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 9999,
        }}
      >
        {open && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 80,
              right: 0,
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'flex-end',
              gap: 1,
            }}
          >
            {actions.map((action) => (
              <Tooltip key={action.name} title={action.name} placement="left">
                <IconButton
                  color="secondary"
                  onClick={() => handleAction(action.action)}
                  sx={{
                    backgroundColor: 'rgba(156, 39, 176, 0.6)',
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(156, 39, 176, 0.8)' },
                  }}
                >
                  {action.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        )}
        <Fab
          color="secondary"
          aria-label="expand"
          onClick={handleToggle}
          sx={{ boxShadow: 3 }}
        >
          {open ? <CloseIcon /> : <AddIcon />}
        </Fab>
      </Box>

      {/* Bottom Drawer */}
      <StyledDrawer
        anchor="bottom"
        open={bottomDrawerOpen}
        onClose={() => setBottomDrawerOpen(false)}
      >
        <BlurredBox sx={{ height: 200 }}>
          <IconButton
            onClick={() => setBottomDrawerOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Bottom Drawer Content</Typography>
          <Typography>
            This is a bottom drawer for lists or other content.
          </Typography>
        </BlurredBox>
      </StyledDrawer>

      {/* Right Drawer */}
      <StyledDrawer
        anchor="right"
        open={rightDrawerOpen}
        onClose={() => setRightDrawerOpen(false)}
      >
        <BlurredBox sx={{ width: 250, height: '100%' }}>
          <IconButton
            onClick={() => setRightDrawerOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Right Drawer Content</Typography>
          <Typography>
            This is a right-side drawer for editing or settings.
          </Typography>
        </BlurredBox>
      </StyledDrawer>

      {/* Modal */}
      <StyledModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disableAutoFocus
      >
        <BlurredBox
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: 800,
            height: '80%',
            maxHeight: 600,
            overflow: 'auto',
            boxShadow: 24,
          }}
        >
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-title" variant="h6" component="h2">
            Modal Title
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            This is a modal for important actions or notifications. It's now
            larger to accommodate more content.
          </Typography>
        </BlurredBox>
      </StyledModal>
    </>
  );
}
