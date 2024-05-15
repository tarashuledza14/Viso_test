import { ICoordinatesData, IMarkerResponse } from '@/interfaces/map.interfaces'
import { db } from '@/utils/firebase.config'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from 'firebase/firestore'

const MARKER = 'marker'

export const MapService = {
	async addMarker(data: ICoordinatesData) {
		try {
			const docRef = await addDoc(collection(db, MARKER), {
				lat: data.lat,
				lng: data.lng,
			})
			return docRef
		} catch (error) {
			throw new Error('Failed to add marker coordinates')
		}
	},
	async getMarker() {
		try {
			let array: IMarkerResponse[] = []
			const querySnapshot = await getDocs(collection(db, MARKER))
			querySnapshot.docs.forEach(doc =>
				array.push({ id: doc.id, ...doc.data() })
			)
			return array
		} catch (error) {
			throw new Error('Failed to get marker coordinates')
		}
	},
	async deleteMarker(id: string) {
		const markerRef = doc(db, MARKER, id)
		try {
			await deleteDoc(markerRef)
		} catch (error) {
			throw new Error('Failed to delete marker coordinates')
		}
	},
	async updateMarker(id: string, data: ICoordinatesData) {
		const docRef = doc(db, MARKER, id)
		try {
			await updateDoc(docRef, {
				lat: data.lat,
				lng: data.lng,
			})
		} catch (error) {
			throw new Error('Failed to update marker coordinates')
		}
	},
}
