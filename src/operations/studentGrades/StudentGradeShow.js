import { Title } from 'react-admin';
import authProvider from "../../providers/authProvider"
import { useEffect, useRef, useState } from "react"
import { Box, Stack, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Typography, TextField, Chip, List, ListItem, ListItemText } from '@mui/material'

import { useParams } from 'react-router-dom'
import { transcriptVersion, transcriptClaim, transcriptRaw } from "../../providers/transcriptProvider"
import { StudentTranscriptClaimStatusEnum } from "../../gen/haClient";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Document , Page } from 'react-pdf'

export const StudentGradeShow = () => {
    const params = useParams()
    const userId = authProvider.getCachedWhoami().id
    const definedStudentId = params.studentId
    const definedTranscriptId = params.transcriptId

    const [versionList, setVersionList] = useState([])
    const [currentVersionId, setCurrentVersionId] = useState("latest")
    const [currentPDF, setCurrentPDF] = useState(null)

    const [claimList, setClaimList] = useState([])

    useEffect(() => {
        const doVersionJob = async () => {
            const res = await transcriptVersion.getList(1,1, {versionId: `${definedStudentId}--${definedTranscriptId}`})
            setVersionList(res)
        }
        doVersionJob()
    },[])

    useEffect(() =>{
        const doClaimJob = async () =>{
            const res = await transcriptClaim.getList(1,1, {claimId: `${definedStudentId}--${definedTranscriptId}--${currentVersionId}`})
            setClaimList(res)
        }
        const doRawJob = async () => {
            const res = await transcriptRaw.getOne(`${definedStudentId}--${definedTranscriptId}--${currentVersionId}`)
            setCurrentPDF(res)
        }
        doRawJob()
        doClaimJob()
    },[currentVersionId])
    const containerRef = useRef(null);


    const handleChangeVersion = (event) => {
        setCurrentVersionId(event.target.value);
    }

    const onClaim = async () => {
        const res = await transcriptClaim.saveOrUpdate({
            id: "",
            transcript_id: definedTranscriptId,
            transcript_version_id: currentVersionId,
            status: "OPEN",
            creation_datetime: Date.now(),
            closed_datetime:"",
            reason: ""
        })
    }
   
    const raId = `${userId}--${definedTranscriptId}`;

    return (
        <>
        <Title title="Version"/>
        <Stack direction={"row"} sx={{ p: 2 }} fullWidth alignItems={"space-between"} justifyContent={"space-between"}>
            <Stack direction={'column'}>
                <FormControl fullWidth>
                    <InputLabel id="demo-dialog-select-label">Version</InputLabel>
                    <Select
                        labelId="demo-dialog-select-label"
                        id="demo-dialog-select"
                        value={currentVersionId}
                        onChange={handleChangeVersion}
                        input={<OutlinedInput label="Version" />}
                    >
                        {versionList.map((vEl) => (<MenuItem value={vEl.id}>{vEl.id}</MenuItem>))}
                    </Select>
                </FormControl>
                <Box>
                    <Typography component="b">Liste des réclamations</Typography>
                    <List>
                    {claimList.map((claim) => (
                        <ListItem>
                             <ListItemText
                                    primary={claim.reason}
                                    secondary={format(new Date(claim.creation_datetime), "dd MMMM yyyy", {locale: fr})}
                                />
                            <Chip label={claim.status == StudentTranscriptClaimStatusEnum.Open ? 'ouvert': 'fermé'}
                                color={claim.status == StudentTranscriptClaimStatusEnum.Open ? 'success': 'error'} size="small"/>
                        </ListItem>
                    ))}
                    </List>
                </Box>
                <Box>
                    <TextField
                        multiline
                        fullWidth
                        placeholder="La raison de votre reclamation..."
                        size="small"
                        />
                </Box>
            </Stack>
            
        </Stack>
        </>
    )
}

export default StudentGradeShow