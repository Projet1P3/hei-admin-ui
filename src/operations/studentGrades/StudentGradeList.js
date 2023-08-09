import React, { useEffect, useState } from 'react'
import { Datagrid, FunctionField, List, TextField } from 'react-admin'
import { maxPageSize } from '../../providers/dataProvider'

import { useParams } from 'react-router-dom'
import { transcriptClaim } from '../../providers/transcriptProvider'


const expanded = (record) => {
    console.log(record.id);
    return (
        <Datagrid>
        </Datagrid>
    )
}
const StudentGradeList = () => {
    const params = useParams()
    const definedStudentId = params.studentId

    const [claim, setClaim] = useState({})

    useEffect(async () => {
        const claimResult = await transcriptClaim.getOne("studentId--transcriptId--versionId--claimId");
        setClaim(claimResult)
    },[])
  return (
    <List
        title={"Liste transcripts"}
        resource='transcripts'
        label="transcript"
        filterDefaultValues={{ studentId: definedStudentId }}
        pagination={false}
        perPage={maxPageSize}
        >
            <Datagrid rowClick={transcriptId => `/students/${definedStudentId}/transcripts/${transcriptId}`} bulkActionButtons={false} >
                <TextField source='semester' label="Semestre"/>
                <TextField source='academic_year' label="Années academique"/>
            </Datagrid>
    </List>
  )
}

export { StudentGradeList }