import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { EventNote as ActivityIcon } from '@mui/icons-material'

interface NavBarProps {
  onActivitiesClick: () => void
  onCreateActivityClick: () => void
}

const NavBar = ({ onActivitiesClick, onCreateActivityClick }: NavBarProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <AppBar 
      position="sticky" 
      sx={{
        background: 'linear-gradient(135deg, #182a73 0%, #218aae 100%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        top: 0,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and App Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ p: 0 }}
            onClick={onActivitiesClick}
          >
            <ActivityIcon sx={{ fontSize: 32 }} />
          </IconButton>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              letterSpacing: '0.5px',
              cursor: 'pointer'
            }}
            onClick={onActivitiesClick}
          >
            Reactivities
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: isMobile ? 1 : 3 
        }}>
          <Button 
            color="inherit" 
            onClick={onActivitiesClick}
            sx={{ 
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Activities
          </Button>
          <Button 
            color="inherit" 
            sx={{ 
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            About
          </Button>
          <Button 
            color="inherit" 
            sx={{ 
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Contacts
          </Button>
          
          {/* Create Activity Button */}
          <Button 
            variant="contained" 
            onClick={onCreateActivityClick}
            sx={{ 
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: 2,
              px: 3,
              '&:hover': {
                backgroundColor: '#45a049',
              }
            }}
          >
            Create Activity
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar