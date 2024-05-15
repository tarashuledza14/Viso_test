'use client'

import { useCreateMarkerMutation } from '@/mutations/useCreateMarkerMutation'
import { APIProvider, Map, MapMouseEvent } from '@vis.gl/react-google-maps'
import Markers from './markers'

export default function Intro() {
	const { mutateAsync: createMarker } = useCreateMarkerMutation()

	const onMapClick = (e: MapMouseEvent) => {
		const newMarker = {
			docId: '',
			markerId: '',
			date: new Date(),
			lat: e.detail.latLng?.lat,
			lng: e.detail.latLng?.lng,
		}

		createMarker(newMarker)
	}

	return (
		<div style={{ height: '100vh', width: '100%' }}>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}>
				<Map
					onDblclick={onMapClick}
					defaultCenter={{ lat: 43.64, lng: -79.41 }}
					defaultZoom={3}
					mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
				>
					<Markers />
				</Map>
			</APIProvider>
		</div>
	)
}
