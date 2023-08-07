import { Show, SimpleShowLayout, TextField } from "react-admin";
import authProvider from "../../providers/authProvider";
import { useState } from "react";

const StudentGradeShow = ({ selectedItem }) => {
  const userId = authProvider.getCachedWhoami().id
  const [transcriptId, setTranscriptId] = useState('latest')
  const [versionId, setVersionId] = useState('latest')
  const raId = `${userId}--${transcriptId}--${versionId}`

  if (!selectedItem) {

    return (
      <>
        <Show id={raId} resource="transcripts" title='Notes'>
          <SimpleShowLayout>
            <TextField source="semester" label="Semestre" />
            <TextField source="academic_year" label="Année academique" />
          </SimpleShowLayout>

        </Show>
      </>
  )
  }
    return (
        <>
          <Show id={selectedItem.raId} resource="transcripts" title='Notes'>
            <SimpleShowLayout>
              <TextField source="semester" label="Semestre" />
              <TextField source="academic_year" label="Année academique" />
            </SimpleShowLayout>
          </Show>
        </>
    )
}

export default StudentGradeShow;