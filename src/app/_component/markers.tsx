import { useDeleteMarkerMutation } from '@/mutations/useDeleteMarkerMutation'
import { useUpdateMarkerMutation } from '@/mutations/useUpdateMarkerMutation'
import { useMarkerQuery } from '@/queries/useMarkerQuery'
import { Marker, MarkerClusterer } from '@googlemaps/markerclusterer'
import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps'
import { useEffect, useRef, useState } from 'react'

type Point = google.maps.LatLngLiteral & { key: string; id: string }

const Markers = () => {
	const { data: initialMarkers } = useMarkerQuery()

	const map = useMap()
	const { mutateAsync: deleteMarker } = useDeleteMarkerMutation()
	const [markersRef, setMarkersRef] = useState<{ [key: string]: Marker }>({})

	const clusterer = useRef<MarkerClusterer | null>(null)
	useEffect(() => {
		if (!map) return
		if (!clusterer.current) {
			clusterer.current = new MarkerClusterer({ map })
		}
	}, [map])

	const handleMarkerClick = (id: string) => {
		deleteMarker(id)
	}

	useEffect(() => {
		clusterer.current?.clearMarkers()
		clusterer.current?.addMarkers(Object.values(markersRef))
	}, [markersRef])

	const handleSetMarkerRef = (marker: Marker | null, key: string) => {
		if (marker && markersRef[key]) return
		if (!marker && !markersRef[key]) return

		setMarkersRef(prev => {
			if (marker) {
				return { ...prev, [key]: marker }
			} else {
				const newMarkers = { ...prev }
				delete newMarkers[key]
				return newMarkers
			}
		})
	}

	const { mutateAsync: updateMarker } = useUpdateMarkerMutation()

	const onDragMarker = (marker: Point) => {
		updateMarker(marker)
	}
	return (
		<>
			{initialMarkers?.map(point => (
				<AdvancedMarker
					onClick={() => handleMarkerClick(point.id)}
					position={point as google.maps.LatLngLiteral}
					key={point.key}
					ref={marker => handleSetMarkerRef(marker, point.key)}
					onDragEnd={e =>
						onDragMarker({
							id: point.id,
							lat: e.latLng?.lat() ?? 0,
							lng: e.latLng?.lng() ?? 0,
							key: point.key,
						})
					}
				>
					<span style={{ fontSize: '2rem' }}>🌳</span>
				</AdvancedMarker>
			))}
		</>
	)
}
export default Markers
