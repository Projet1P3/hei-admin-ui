import { StudentTranscriptClaim } from 'src/gen/haClient'
import { transcriptsApi } from './api'
import { HaDataProviderType } from './HaDataProviderType'

const raSeparator = '--'
const toApiIds = (raId: string) => {
  const ids = raId.split(raSeparator)
  return { studentId: ids[0], transcriptId: ids[1], versionId: ids[2], claimId: ids[3] }
}

const transcriptProvider: HaDataProviderType = {
  async getList(page: number, perPage: number, filter: any): Promise<any[]> {
    const result = await transcriptsApi().getStudentTranscripts(filter.studentId, page, perPage)

    return result.data.map(transcript => ({
      ...transcript
    }))
  },
  async getOne(raId: string): Promise<any> {
    const { studentId, transcriptId } = toApiIds(raId)

    const result = await transcriptsApi().getStudentTranscriptById(studentId, transcriptId)

    return {
      ...result.data,
      id: raId
    }
  },
  saveOrUpdate: function (resources: any): Promise<any> {
    throw new Error('Function not implemented.')
  }
}

/** */
const transcriptVersion = {
  async getList(page: number, perPage: number, filter: any): Promise<any[]> {
    const { studentId, transcriptId } = toApiIds(filter.versionId)
    const result = await transcriptsApi().getTranscriptsVersions(studentId, transcriptId, page, perPage)

    return result.data.map(transcript => ({
      ...transcript
    }))
  },
  async getOne(raId: string): Promise<any> {
    const { studentId, transcriptId, versionId } = toApiIds(raId)

    const result = await transcriptsApi().getStudentTranscriptByVersion(studentId, transcriptId, versionId)

    return {
      ...result.data
    }
  },
  async saveOrUpdate() {
    throw new Error('Not implemented')
  }
}

/** */
const transcriptClaim = {
  async getList(page: number, perPage: number, filter: any): Promise<any[]> {
    const { studentId, transcriptId, versionId } = toApiIds(filter.claimId)

    const result = await transcriptsApi().getStudentTranscriptClaims(studentId, transcriptId, versionId, page, perPage)

    return result.data
  },
  async getOne(raId: string) {
    const { studentId, transcriptId, versionId, claimId } = toApiIds(raId)

    const result = await transcriptsApi().getStudentClaimOfTranscriptVersion(studentId, transcriptId, versionId, claimId)

    return {
      ...result.data
    }
  },
  async saveOrUpdate(ressource: StudentTranscriptClaim, raId: string) {
    const { studentId, transcriptId, versionId, claimId } = toApiIds(raId)
    const result = await transcriptsApi().putStudentClaimsOfTranscriptVersion(studentId, transcriptId, versionId, claimId, ressource)

    return result.data
  }
}

/** */

const transcriptRaw = {
  async getOne(raId: string): Promise<any> {
    const { studentId, transcriptId, versionId } = toApiIds(raId)

    const result = await transcriptsApi().getStudentTranscriptVersionPdf(studentId, transcriptId, versionId)

    return result.data
  },
  async saveOrUpdate(raId: string, file: File) {
    const { studentId, transcriptId } = toApiIds(raId)
    const result = await transcriptsApi().putStudentTranscriptVersionPdf(studentId, transcriptId, file)

    return result.data
  }
}

export { transcriptProvider, transcriptClaim, transcriptVersion, transcriptRaw }
