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
          <Stack width={"100%"} px={0}>
            <BrowserRouter>
              <MobileHeader />
              <Router />
            </BrowserRouter>
          </Stack>
        ) : (
          <HStack gap={0} width="70vw" position="relative">
            <BrowserRouter>
              <SideMenu />
              <Router />
            </BrowserRouter>
          </HStack>
        )}

      </ChakraProvider >
    </>
  )
}

export default App
