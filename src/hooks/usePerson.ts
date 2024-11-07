import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { SuccessResponse } from "../types/SuccesResponse";
import { Person } from "../types/Person";
import { fetchRandomPersons } from "../api/person/ApiPerson";


/**
 * Custom React hook to fetch a list of random persons based on the provided `limit` and `job`.
 *
 * @param {number} limit - The number of persons to be fetched.
 * @param {number} job - The job type filter, which can be "Actor", "Director", or "Writer".
 * @param {string} token - The Bearer token used for authorization in the request.
 * @param {boolean} [shouldFetch = true] - A boolean indicating whether the persons should be fetched or not (default is true).
 * @returns {UseQueryResult<SuccessResponse<Comment[]> , Error>}  An object containing the query status and fetched data.
 * @throws {Error} If an error occurs during the fetch operation. 
 */
export const useRandomPersons = (job: string, limit: number, token: string, shouldFetch: boolean = true): UseQueryResult<SuccessResponse<Person[]>> => {
    if(!token){
        shouldFetch = false
    }

    return useQuery<SuccessResponse<Person[]>, Error>({
        queryKey: ["randomPersons", job, limit, token],
        queryFn: () => fetchRandomPersons(limit, job, token),
        enabled: shouldFetch
    })
}