import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import { ImagesProvider } from './context/ImagesContext'
import Layout from './components/Layout'
import PhotosPage from './pages/PhotosPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ImagesProvider>
        <Layout>
          <PhotosPage />
        </Layout>
      </ImagesProvider>
    </ThemeProvider>
  )
}

export default App
