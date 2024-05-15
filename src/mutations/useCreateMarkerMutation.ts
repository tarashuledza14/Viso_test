import { type ICoordinatesData } from '@/interfaces/map.interfaces'
import { MapService } from '@/services/map.services'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateMarkerMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: ICoordinatesData) => {
			return await MapService.addMarker(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get-markers'] })
		},
	})
}
