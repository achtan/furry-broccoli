import React from 'react'
import ReactModal from 'react-modal'
import { Box } from './Box'
import { Icon } from './Icon'

ReactModal.setAppElement('#react-target')

const customStyles = {
  overlay: { zIndex: 99 },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    overflow: 'visible',
  },
}
export const Modal = ({children, ...props}) => {
  return <ReactModal style={customStyles} {...props} >
    <Box>
      <Box alignItems="flex-end">
        <Box onClick={props.onRequestClose} px={4} pt={4} pb={2}><Icon icon="times" /></Box>
      </Box>
      <Box px={4} pb={4}>{children}</Box>
    </Box>
  </ReactModal>
}
