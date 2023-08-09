import { transcriptsApi } from "./api";
import { HaDataProviderType } from "./HaDataProviderType";

const raSeparator = '--';
const toApiIds = (raId: string) => {
    const ids = raId.split(raSeparator);
    return { studentId: ids[0], transcriptId: ids[1], versionId: ids[2], claimId: ids[3] };
}

const transcriptProvider: HaDataProviderType = {
    async getList (page: number, perPage: number, filter: any): Promise<any[]> {
        // const result = await transcriptsApi().getStudentTranscripts(filter.studentId, page, perPage);
    
        const result = {data: [{
            id: "tId1",
            student_id: "STD21000",
            semester: "S1",
            academic_year: "2021-2022",
            is_definitive: true,
            creattion_datetime: "2023-08-04T17:06:03.641Z"
        },
        {
            id: "tId2",
            student_id: "STD21000",
            semester: "S4",
            academic_year: "2022-2023",
            is_definitive: true,
            creattion_datetime: "2023-08-04T17:06:03.641Z"
        }]}
        
        return result.data.map((transcript) => ({
            ...transcript,
            id: filter.studentId
        }))
    },
    async getOne (raId: string): Promise<any> {
        const { studentId, transcriptId } = toApiIds(raId);
        
        // const result = await transcriptsApi().getStudentTranscriptById(studentId, transcriptId);
        const result = [{data: {
            id: "tId1",
            student_id: "STD21000",
            semester: "S1",
            academic_year: "2021-2022",
            is_definitive: true,
            creattion_datetime: "2023-08-04T17:06:03.641Z"
        }}]
        return {
            ...result[0].data,
            id: raId
        }
    },
    async saveOrUpdate (resources: Array<any>): Promise<any> {
        const transcripts = resources[0];
        const studentId = transcripts[0] ? transcripts[0].student_id : null;
        const result = await transcriptsApi().crudStudentTranscripts(studentId, transcripts);
        return {...result.data}
    }
}


/** */
const transcriptVersion = {
    async getList (page: number, perPage: number, filter: any): Promise<any[]> {
        const { studentId, transcriptId } = toApiIds(filter.versionId);
        // const result = await transcriptsApi().getTranscriptsVersions(studentId, transcriptId, page, perPage);

        const result = {data: [{
            id: "vId1",
            transctipt_id: "tId1",
            ref: "VREF1",
            created_by_user_id: "MNG1",
            created_by_user_role: "MANAGER",
            creattion_datetime: "2023-08-04T18:36:35.235Z"
        }]}

        return result.data.map((transcript) => ({
            ...transcript,
            id: filter.studentId
        }))
    },
    async getOne (raId: string): Promise<any> {
        const { studentId, transcriptId, versionId } = toApiIds(raId);

        // const result = await transcriptsApi().getStudentTranscriptByVersion(studentId, transcriptId, versionId);

        const result = {data: {
            id: "vId1",
            transctipt_id: "tId1",
            ref: "VREF1",
            created_by_user_id: "MNG1",
            created_by_user_role: "MANAGER",
            creattion_datetime: "2023-08-04T18:36:35.235Z"
        }}
        return {
            ...result.data,
            id: raId
        };
    },
    async saveOrUpdate () {
        throw new Error("Not implemented.");
    }
}


/** */
const transcriptClaim = {
    async getList (page: number, perPage: number, filter: any): Promise<any[]> {
        const { studentId, transcriptId, versionId } = toApiIds(filter.claimId);

        // const result = await transcriptsApi().getStudentTranscriptClaims(studentId,transcriptId, versionId, page, perPage);

        const result = {data: [{
            id: "cId1",
            transctipt_id: "tId1",
            transctipt_version_id: "vId1",
            status: "OPEN",
            creattion_datetime: "2023-08-04T19:16:08.326Z",
            closed_datetime: "2023-08-04T19:16:08.326Z",
            reason: "Verif correction"
        }]}
        return result.data.map((claim) => ({
            ...claim,
            id: filter.claimId
        }))
    },
    async getOne (raId: string) {
        const { studentId, transcriptId, versionId, claimId } = toApiIds(raId);
        
        // const result = await transcriptsApi().getStudentClaimOfTranscriptVersion(studentId, transcriptId, versionId, claimId);
    
        const result = {data: {
            id: "cId1",
            transctipt_id: "tId1",
            transctipt_version_id: "vId1",
            status: "OPEN",
            creattion_datetime: "2023-08-04T19:16:08.326Z",
            closed_datetime: "2023-08-04T19:16:08.326Z",
            reason: "Verif correction"
        }}
        return {
            ...result.data,
            id: raId
        };
        
    },
    async saveOrUpdate (resource: any): Promise<any> {
        const transcriptClaim = resource[0];
        const studentId = transcriptClaim[0] ? transcriptClaim[0].student_id : null;
        const transcriptId = transcriptClaim[0] ? transcriptClaim[0].transcript_id : null;
        const versionId = transcriptClaim[0] ? transcriptClaim[0].version_id : null;
        const claimId = transcriptClaim[0] ? transcriptClaim[0].claim_id : null;

        const result = await transcriptsApi().putStudentClaimsOfTranscriptVersion(studentId, transcriptId, versionId, claimId, transcriptClaim)
        return {...result.data}
    }
}

/** */

const transcriptRaw = {
    async getOne (raId: string) {
        const { studentId, transcriptId, versionId } = toApiIds(raId);

        // const result = await transcriptsApi().getStudentTranscriptVersionPdf(studentId, transcriptId, versionId);
        // return {
        //     ...result.data,
        //     id: raId
        // };
    },
    async saveOrUpdate (resources: any): Promise<any> {
        const transcriptRaw = resources[0];
        const studentId = transcriptRaw[0] ? transcriptRaw[0].student_id : null;
        const transcriptId = transcriptRaw[0] ? transcriptRaw[0].transcript_id : null;
        const result = await transcriptsApi().putStudentTranscriptVersionPdf(studentId, transcriptId, transcriptRaw)
        return {...result.data}
    }
}

export { transcriptProvider, transcriptVersion, transcriptClaim, transcriptRaw }