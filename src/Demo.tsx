
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { styled, Theme, ThemeProvider } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import theme from './theme';
import './index.css';

// スタイル付きコンポーネントの作成
// スタイル付きコンポーネントの作成
const BlurredBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  backdropFilter: 'blur(6px)',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  position: 'relative',
  boxShadow: '0 4px 12px rgba(0, 82, 136, 0.15)',
}));

const StyledDrawer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    backdropFilter: 'blur(6px)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
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
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);

  const handleToggle = () => setOpen(!open);
  const handleLeftDrawerToggle = () => setLeftDrawerOpen(!leftDrawerOpen);

  const actions: Action[] = [
    {
      icon: <ListIcon />,
      name: 'Flight Logs',
      action: () => setBottomDrawerOpen(true),
    },
    {
      icon: <EditIcon />,
      name: 'Flight Settings',
      action: () => setRightDrawerOpen(true),
    },
    {
      icon: <SettingsIcon />,
      name: 'System Info',
      action: () => setModalOpen(true),
    },
  ];

  const navItems = [
    { name: 'Dashboard', icon: <ListIcon /> },
    { name: 'Flights', icon: <EditIcon /> },
    { name: 'Maintenance', icon: <SettingsIcon /> },
    { name: 'Reports', icon: <ListIcon /> },
  ];

  const handleAction = (actionFunc: () => void) => {
    actionFunc();
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {ModalOverlayStyles}

      {/* Left Drawer for Navigation */}
      <StyledDrawer
        anchor="left"
        open={leftDrawerOpen}
        onClose={() => setLeftDrawerOpen(false)}
      >
        <BlurredBox sx={{ width: 280, height: '100%' }}>
          <IconButton
            onClick={() => setLeftDrawerOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Navigation
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {navItems.map((item) => (
              <Tooltip key={item.name} title={item.name} placement="right">
                <IconButton
                  color="primary"
                  sx={{
                    justifyContent: 'flex-start',
                    width: '100%',
                    color: theme.palette.primary.main,
                  }}
                >
                  {item.icon}
                  <Typography sx={{ ml: 1 }}>{item.name}</Typography>
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </BlurredBox>
      </StyledDrawer>

      {/* Button to toggle Left Drawer */}
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 9999,
        }}
      >
        <Tooltip title="Toggle Navigation" placement="right">
          <IconButton
            color="primary"
            onClick={handleLeftDrawerToggle}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark || '#003d66',
              },
            }}
          >
            <ListIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Existing Bottom Right Floating Action Button and Menu */}
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
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.dark || '#c17900',
                    },
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
        <BlurredBox sx={{ height: 250 }}>
          <IconButton
            onClick={() => setBottomDrawerOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Flight Logs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Recent flight logs and status updates for Dorone aircraft.
          </Typography>
          {/* Placeholder for flight logs list */}
          <Box sx={{ mt: 2, maxHeight: 140, overflowY: 'auto' }}>
            <Typography variant="body2">- Flight #1234: Completed</Typography>
            <Typography variant="body2">- Flight #5678: Scheduled</Typography>
            <Typography variant="body2">- Flight #9101: In Progress</Typography>
          </Box>
        </BlurredBox>
      </StyledDrawer>

      {/* Right Drawer */}
      <StyledDrawer
        anchor="right"
        open={rightDrawerOpen}
        onClose={() => setRightDrawerOpen(false)}
      >
        <BlurredBox sx={{ width: 300, height: '100%' }}>
          <IconButton
            onClick={() => setRightDrawerOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Flight Settings
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Configure flight parameters and system preferences.
          </Typography>
          {/* Placeholder for settings controls */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">- Max Altitude: 12000 ft</Typography>
            <Typography variant="body2">- Speed Limit: 250 knots</Typography>
            <Typography variant="body2">- Auto-Pilot: Enabled</Typography>
          </Box>
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
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            System Information
          </Typography>
          <Typography id="modal-description" variant="body2" color="text.secondary">
            Overview of system status, version, and notifications.
          </Typography>
          {/* Placeholder for system info */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">- Version: 1.2.3</Typography>
            <Typography variant="body2">- Uptime: 72 hours</Typography>
            <Typography variant="body2">- Alerts: None</Typography>
          </Box>
        </BlurredBox>
      </StyledModal>
    </ThemeProvider>
  );
}
