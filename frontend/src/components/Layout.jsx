import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Sidebar from './Sidebar'
import Header from './Header'
import { ScrollContainerProvider, useScrollContainerRef } from '../context/ScrollContainerContext'

function ScrollableContent({ children }) {
  const scrollContainerRef = useScrollContainerRef()
  return (
    <Box
      ref={scrollContainerRef}
      id="app-scroll-container"
      sx={{ flex: 1, minHeight: 0, overflowY: 'auto', p: 3 }}
    >
      {children}
    </Box>
  )
}

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}
      >
        <Toolbar />
        <ScrollContainerProvider>
          <ScrollableContent>{children}</ScrollableContent>
        </ScrollContainerProvider>
      </Box>
    </Box>
  )
}

export default Layout
