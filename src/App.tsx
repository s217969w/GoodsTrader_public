import { ChakraProvider, defaultSystem, HStack, Stack } from '@chakra-ui/react'
import './App.css'

import SideMenu from './components/Menu/SideMenu.tsx'
import Router from './Router.tsx'
import { BrowserRouter } from 'react-router-dom'
import MobileHeader from './components/Menu/MobileHeader.tsx'
import { useIsNarrow } from './utils/useWindowSize.ts'

// Sidebar width should match the width in SideMenu.tsx
const SIDEBAR_WIDTH = "max(10vw, 180px)";

function App() {
  const isNarrow = useIsNarrow();

  return (
    <>
      <ChakraProvider value={defaultSystem}>
        {isNarrow ? (
          <div style={{display:"flex", flexDirection:"column"}}>
            <BrowserRouter>
            <MobileHeader />
              <Router />
            </BrowserRouter>
          </div>
        ) : (
          <div style={{display:"flex", flexDirection:"row"}}>
            <BrowserRouter>
            <div style={{width:SIDEBAR_WIDTH, height:"100vh", backgroundColor:"blue.50"}}>
                <SideMenu />
            </div>
            <div style={{width:"max(90vw, 100vw - 180px)", height:"100vh", padding:"30px"}}>
              <Router />
            </div>
            </BrowserRouter>
          </div>
        )}

      </ChakraProvider >
    </>
  )
}

export default App
