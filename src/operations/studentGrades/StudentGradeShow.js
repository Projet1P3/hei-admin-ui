import { Show, SimpleShowLayout, TextField } from "react-admin"
import authProvider from '../../providers/authProvider'
import { useState } from "react"

export const StudentGradeShow = () => {
    const userId = authProvider.getCachedWhoAmi().id;
    const [transcriptId, setTranscriptId] = useState("latest");
    const [versionId, setVersionId] = useState("latest");
    const raId = `${userId}--${transcriptId}--${versionId}`;
    return (
        <Show id={raId} resource="transcripts" title='Notes'>
            <SimpleShowLayout>
                <TextField source="semester" label="Semestre"/>
                <TextField source="academic_year" label="Année académique"/>
            </SimpleShowLayout>
        </Show>
    )
}