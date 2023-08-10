import { Button, Input, Modal, Typography, Stack, Box, InputAdornment, IconButton } from '@mui/material'
import { useState } from 'react'
import { useNotify } from 'react-admin'
import { transcriptRaw } from '../../providers/transcriptProvider'
import { Add as AddIcon, Attachment as AttachmentIcon } from '@mui/icons-material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4
}

const UploadVersion = ({ studentId, transcriptId }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [file, setFile] = useState(null)
  const notify = useNotify()
  const createLatestVersion = async () => {
    if (file) {
      await transcriptRaw.saveOrUpdate(`${studentId}--${transcriptId}`, file)
      handleClose()
      notify('Version créer avec success')
    } else {
      throw new Error('PDF file required')
    }
  }

  return (
    <Box>
      <Button onClick={handleOpen}>
        <AddIcon />
        Créer une version
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Stack direction={'column'} sx={style} alignItems={'center'} spacing={2}>
          <Typography component={'strong'}>Dernière version </Typography>
          <Input
            type='file'
            disableUnderline
            inputProps={{ accept: 'application/pdf' }}
            onChange={e => setFile(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton component='label' htmlFor='file-input'>
                  <AttachmentIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          <Button variant='contained' size='large' onClick={createLatestVersion}>
            Envoyer
          </Button>
        </Stack>
      </Modal>
    </Box>
  )
}

export default UploadVersion
