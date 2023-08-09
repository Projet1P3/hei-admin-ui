import authProvider from "../../providers/authProvider";
import { useEffect, useState } from "react";
import { transcriptClaim, transcriptVersion } from "../../providers/transcriptProvider";
import Grid from '@mui/material/Grid'
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';


const StudentGradeShow = (props) => {
    const params = useParams()
    const userId = authProvider.getCachedWhoami().id
    const definedStudentId = params.studentId
    const definedTranscriptId = params.transcriptId
    const [versionId, setVersionId] = useState('latest')
    const [version, setVersion] = useState({})
    const [versions, setVersions] = useState([])
    const [claim, setClaim] = useState({})
    useEffect(async () => {
        const claimResult = await transcriptClaim.getOne("studentId--transcriptId--versionId--claimId");
        setClaim(claimResult)
    }, [])
    useEffect(async () => {
        const versionResult = await transcriptVersion.getOne(`${definedStudentId}--${definedTranscriptId}--${versionId}`);
        setVersion(versionResult)
    }, []);

    useEffect(() => {
        const versionListResult = async () => {
            const res = await transcriptVersion.getList(1, 1, { versionId: `${definedStudentId}--${definedTranscriptId}` });
            setVersions(res)
            console.log(res);
        }

        versionListResult()
    }, []);

    const handleVersionClick = async (clickedVersionId) => {
        const clickedVersionResult = await transcriptVersion.getOne("studentId--transcriptId--" + clickedVersionId);
        setVersion(clickedVersionResult);
    };
    useEffect(() => {
        if (!versionId && versions.length > 0) {
            setVersionId(versions[0].id); 
        }
    }, [versionId, versions]);
    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ m: 2}}>
                <Grid item xs={6}>
                    <Typography variant="h4">Claim list</Typography>
                    <Typography> Status: {claim.status} </Typography><br />
                </Grid>
                <Grid item xs={6}>

                    {version && (
                        <div>
                            <Typography variant="h4">Version Détails</Typography>
                            <Typography>ID: {version.id}</Typography><br />
                        </div>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4">Version List</Typography>
                    {versions.length === 0 ? (
                        <Typography>Aucune verson disponible.</Typography>
                    ) : (
                        <List>
                            {versions.map((versionItem) => (
                                <ListItem key={versionItem.id}>
                                    <Link onClick={() => handleVersionClick(versionItem.id)}> {versionItem.id}</Link><br />
                                </ListItem>
                            ))}
                        </List>
                    )}

                </Grid>

            </Grid>
        </>
    )
}

export default StudentGradeShow;