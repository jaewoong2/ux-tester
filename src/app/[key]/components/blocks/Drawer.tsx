'use client'
import React, { PropsWithChildren, useEffect } from 'react'
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Drawer as ChakraDrawer,
  DrawerProps,
  DrawerContentProps,
} from '@chakra-ui/react'

const Drawer = ({
  children,
  contents,
  ...props
}: PropsWithChildren<Omit<DrawerProps, 'isOpen' | 'onClose'> & { contents: DrawerContentProps }>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    onOpen()
  }, [])

  return (
    <ChakraDrawer placement='bottom' {...props} onClose={onClose} isOpen={isOpen}>
      <DrawerContent {...contents}>
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>{children}</DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue'>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  )
}

export default Drawer
