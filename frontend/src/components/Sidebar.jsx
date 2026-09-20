import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded'

export const SIDEBAR_WIDTH = 256

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          borderRight: 'none',
        },
      }}
    >
      <Toolbar />
      <List sx={{ px: 1 }}>
        <ListItemButton selected sx={{ borderRadius: 999, pl: 3 }}>
          <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
            <PhotoLibraryRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Photos"
            slotProps={{ primary: { fontWeight: 600, color: 'primary.main' } }}
          />
        </ListItemButton>
      </List>
    </Drawer>
  )
}

export default Sidebar
