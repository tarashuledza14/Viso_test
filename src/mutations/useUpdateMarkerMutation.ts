import { Point } from '@/app/_component/markers'
import { MapService } from '@/services/map.services'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateMarkerMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (marker: Point) => {
			return await MapService.updateMarker(marker)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get-markers'] })
		},
	})
}
