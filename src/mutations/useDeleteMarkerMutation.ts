import { MapService } from '@/services/map.services'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteMarkerMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (id: string) => {
			return await MapService.deleteMarker(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get-markers'] })
		},
	})
}
