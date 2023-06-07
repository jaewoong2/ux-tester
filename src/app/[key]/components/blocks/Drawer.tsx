'use client'
import React, { PropsWithChildren } from 'react'
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Drawer as ChakraDrawer,
  DrawerProps,
  DrawerContentProps,
  UseDisclosureProps,
} from '@chakra-ui/react'

const Drawer = ({
  children,
  contents,
  onClose,
  isOpen,
  ...props
}: PropsWithChildren<Omit<DrawerProps, 'isOpen' | 'onClose'> & { contents: DrawerContentProps }> &
  Required<UseDisclosureProps>) => {
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
