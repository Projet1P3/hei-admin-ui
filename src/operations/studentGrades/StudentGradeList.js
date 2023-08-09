import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { maxPageSize } from '../../providers/dataProvider'
import { Datagrid, FunctionField, List, TextField } from "react-admin"
import { Logger } from "aws-amplify"

const StudentGradeList = (props) => {
    const params = useParams()
    const definedStudentId = params.studentId

    return (
        <>
            <List
                title={"Listes des transcripts"}
                resource="transcripts"
                label="transcript"
                filterDefaultValues={{ studentId: definedStudentId }}
                pagination={false}
                perPage={maxPageSize}
                {...props}
            >
                <Datagrid bulkActionButtons={false} >
                    <TextField source="semester" label="Semestre" />
                    <TextField source="id" label="Id" />
                    <TextField source="academic_year" label="Années academique" />
                    <FunctionField label="Détails" render={(record) => (
                        <>
                         <Link to={`/students/${definedStudentId}/transcripts/${record.id}`}>Voir les détails</Link>
                        </>
                                               
                    )} />
                </Datagrid>

            </List>

        </>
    )
}

export { StudentGradeList } 