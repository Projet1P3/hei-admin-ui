import { Button, Title } from 'react-admin'
import authProvider from '../../providers/authProvider'
import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Typography,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Popover
} from '@mui/material'

import { useParams } from 'react-router-dom'
import { transcriptVersion, transcriptClaim, transcriptRaw } from '../../providers/transcriptProvider'
import { StudentTranscriptClaimStatusEnum, WhoamiRoleEnum } from '../../gen/haClient'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Send as SendIcon, MoreVertSharp } from '@mui/icons-material'

import { v4 as uuidv4 } from 'uuid'
import { PdfViewer } from '../utils'
import UploadVersion from './UploadVersion'

export const StudentTranscriptShow = () => {
  const params = useParams()
  const userId = authProvider.getCachedWhoami().id
  const definedStudentId = params.studentId
  const definedTranscriptId = params.transcriptId
  const role = authProvider.getCachedRole()

  const [claimMessage, setClaimMessage] = useState('')

  const [versionList, setVersionList] = useState([])
  const [currentVersionId, setCurrentVersionId] = useState('latest')
  const [currentPDF, setCurrentPDF] = useState(null)

  const [claimList, setClaimList] = useState([])

  useEffect(() => {
    const doVersionJob = async () => {
      const res = await transcriptVersion.getList(1, 1, { versionId: `${definedStudentId}--${definedTranscriptId}` })
      setVersionList(res)
    }
    doVersionJob()
  }, [])

  useEffect(() => {
    const doClaimJob = async () => {
      const res = await transcriptClaim.getList(1, 1, { claimId: `${definedStudentId}--${definedTranscriptId}--${currentVersionId}` })
      setClaimList(res)
    }
    const doRawJob = () => {
      setCurrentPDF(`${process.env.REACT_APP_API_URL}/students/${definedStudentId}/transcripts/${definedTranscriptId}/versions/${currentVersionId}/raw`)
    }
    doRawJob()
    doClaimJob()
  }, [currentVersionId])

  const handleChangeVersion = event => {
    setCurrentVersionId(event.target.value)
  }

  const onSubmitClaim = async () => {
    const newUUID = uuidv4()
    const res = await transcriptClaim.saveOrUpdate(
      {
        id: uuidv4(),
        transcript_id: definedTranscriptId,
        transcript_version_id: currentVersionId,
        status: 'OPEN',
        creation_datetime: new Date().toISOString(),
        closed_datetime: '',
        reason: claimMessage || ''
      },
      `${definedStudentId}--${definedTranscriptId}--${currentVersionId}--${newUUID}`
    )
    setClaimMessage('')
  }

  const raId = `${userId}--${definedTranscriptId}`
  const [anchorEl, setAnchorEl] = useState(null)

  const handleEdit = id => {}

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <>
      <Title title='Version' />
      <Stack direction={'row'} sx={{ p: 2 }} fullWidth alignItems={'space-between'} justifyContent={'space-between'}>
        <Stack direction={'column'}>
          <FormControl fullWidth  size='small'>
            <InputLabel id='demo-dialog-select-label'>Version</InputLabel>
            <Select
              labelId='demo-dialog-select-label'
              id='demo-dialog-select'
              value={currentVersionId}
              onChange={handleChangeVersion}
              input={<OutlinedInput label='Version' />}
            >
              {versionList.map(vEl => (
                <MenuItem value={vEl.id}>{vEl.id}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
            <Typography component='b'>Liste des réclamations</Typography>
            <List>
              {claimList.map(claim => (
                <ListItem>
                  <ListItemText primary={claim.reason} secondary={format(new Date(claim.creation_datetime), 'dd MMMM yyyy', { locale: fr })} />
                  <Chip
                    label={claim.status == StudentTranscriptClaimStatusEnum.Open ? 'ouvert' : 'fermé'}
                    color={claim.status == StudentTranscriptClaimStatusEnum.Open ? 'success' : 'error'}
                    size='small'
                  />
                  <IconButton disableRipple aria-describedby={id} variant='contained' onClick={handleClick}>
                    <MoreVertSharp />
                  </IconButton>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    sx={{ width: 200 }}
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'left'
                    }}
                    transformOrigin={{
                      vertical: 'center',
                      horizontal: 'right'
                    }}
                  >
                    <Typography>pop</Typography>
                    <Button
                      variant='small'
                      fullWidth
                      onClick={() => {
                        handleEdit(claim.id)
                      }}
                    >
                      Envoyer
                    </Button>
                  </Popover>
                </ListItem>
              ))}
            </List>
          </Box>
          {role === WhoamiRoleEnum.Student && (
            <Box sx={{ display: 'flex', m: 2, alignItems: 'flex-start' }}>
              <TextField
                multiline
                fullWidth
                placeholder='Votre reclamation...'
                onChange={e => setClaimMessage(e.target.value)}
                value={claimMessage}
                size='small'
              />
              <IconButton color='primary' onClick={onSubmitClaim} disabled={claimMessage.trim()?.length <= 0}>
                <SendIcon />
              </IconButton>
            </Box>
          )}
        </Stack>
        <Box>
            {role === WhoamiRoleEnum.Manager && <UploadVersion studentId={definedStudentId} transcriptId={definedTranscriptId}/>}
          <PdfViewer url={currentPDF} />
        </Box>
      </Stack>
    </>
  )
}

export default StudentTranscriptShow
