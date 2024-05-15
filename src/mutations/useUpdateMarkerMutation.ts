import { IMarkerResponse } from '@/interfaces/map.interfaces'
import { MapService } from '@/services/map.services'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateMarkerMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id, ...rest }: IMarkerResponse) => {
			return await MapService.updateMarker(id, rest)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get-markers'] })
		},
	})
}
