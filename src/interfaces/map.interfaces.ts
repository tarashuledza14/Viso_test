import { Timestamp } from 'firebase/firestore'

export interface ICoordinatesData {
	lat?: number
	lng?: number
}
export interface IMarkerResponse extends ICoordinatesData {
	id: string
	date?: Timestamp
}
