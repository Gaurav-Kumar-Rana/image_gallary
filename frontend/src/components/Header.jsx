import { useRef, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import { SIDEBAR_WIDTH } from './Sidebar'
import { useImages } from '../context/ImagesContext'

function Header() {
  const { searchQuery, setSearchQuery, upload, uploading } = useImages()
  const [anchorEl, setAnchorEl] = useState(null)
  const fileInputRef = useRef(null)

  const menuOpen = Boolean(anchorEl)

  const handleAddClick = (event) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const handleUploadClick = () => {
    handleMenuClose()
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    try {
      await upload(file)
    } catch {
      // error is surfaced via context state
    }
  }

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        ml: `${SIDEBAR_WIDTH}px`,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            maxWidth: 720,
            bgcolor: 'action.hover',
            borderRadius: 999,
            px: 2,
            py: 0.5,
          }}
        >
          <SearchRoundedIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
          <InputBase
            placeholder="Search your photos"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ flex: 1 }} />

        <IconButton
          onClick={handleAddClick}
          aria-label="add"
          aria-controls={menuOpen ? 'add-menu' : undefined}
          aria-haspopup="true"
          sx={{ bgcolor: 'action.hover' }}
        >
          {uploading ? <CircularProgress size={22} /> : <AddRoundedIcon />}
        </IconButton>
        <Menu id="add-menu" anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
          <MenuItem onClick={handleUploadClick} disabled={uploading}>
            <ListItemIcon>
              <UploadFileRoundedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Upload</ListItemText>
          </MenuItem>
        </Menu>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif"
          hidden
          onChange={handleFileChange}
        />
      </Toolbar>
    </AppBar>
  )
}

export default Header
