import { MapService } from '@/services/map.services'
import { useQuery } from '@tanstack/react-query'

export const useMarkerQuery = () => {
	return useQuery({
		queryKey: ['get-markers'],
		queryFn: () => MapService.getMarker(),
		select: data =>
			data.map(({ id, lat, lng, date }) => ({
				id,
				lat,
				lng,
				date,
				key: JSON.stringify({ id, lat, lng, date }),
			})),
	})
}
