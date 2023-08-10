import { Document as Pdf, Page as PdfPage } from 'react-pdf/dist/esm/entry.webpack'
import { Box, Divider, IconButton, Tooltip } from '@mui/material'
import { DownloadForOffline } from '@mui/icons-material'
import { useState } from 'react'

const TooltipButton = ({ icon, disabled, onClick, ...others }) => (
  <Tooltip {...others} sx={{ margin: '0 15px' }}>
    <IconButton onClick={onClick} disabled={disabled}>
      {icon}
    </IconButton>
  </Tooltip>
)

export const PdfViewer = ({ url, filename = 'raw' }) => {
  const [pageNum, setPageNum] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  const onDocumentLoaded = ({ numPages }) => {
    setPageNum(numPages)
  }

  return (
    <Box sx={{ border: '1px solid #001948', minWidth: 700, minHeight: 800, textAlign: 'center' }}>
      <Box sx={{ textAlign: 'end' }}>
        <a href={url} target='_blank' rel='noreferrer' download={filename + '.pdf'}>
          <TooltipButton title='Télécharger' icon={<DownloadForOffline />} size='small' />
        </a>
        <Divider />
      </Box>
      <Pdf file={url} onLoadSuccess={onDocumentLoaded}>
        <PdfPage pageNumber={currentPage} />
      </Pdf>
    </Box>
  )
}
