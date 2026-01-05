import { ChakraProvider, defaultSystem, HStack, Stack } from '@chakra-ui/react'
import './App.css'

import SideMenu from './components/Menu/SideMenu.tsx'
import Router from './Router.tsx'
import { BrowserRouter } from 'react-router-dom'
import MobileHeader from './components/Menu/MobileHeader.tsx'
import { useIsNarrow } from './utils/useWindowSize.ts'
import SeriesSelector from './components/Menu/SeriesSelector.tsx'
import TraderHeader from './components/Menu/TraderHeader.tsx'

// Sidebar width should match the width in SideMenu.tsx
const SIDEBAR_WIDTH = "max(10vw, 180px)";

function App() {
  const isNarrow = useIsNarrow();

  return (
    <>
      <ChakraProvider value={defaultSystem}>
        {isNarrow ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <BrowserRouter>
              <MobileHeader />
              <Router />
            </BrowserRouter>
          </div>
        ) : (
          <div style={{
            display: "flex",
            flexDirection: "row",
            width: "100vw",
            height: "100vh"
          }}>
              <BrowserRouter>
                <div style={{ width: "50px", backgroundColor: "blue.50", overflow: "hidden" }}>
                  <SeriesSelector path='/src/data/series.json' />
                </div>
                <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ height: "70px", backgroundColor: "blue.50" }}>
                    <TraderHeader />
                  </div>
                  <div style={{ height: "100%", backgroundColor: "blue.50", overflow: "auto" }}>
                    <Router />
                  </div>
                </div>
              </BrowserRouter>
            </div>
        )}

      </ChakraProvider >
    </>
  )
}

export default App
