import {z} from 'zod'

export const PersonSchema = z.object({
    ID_Personne: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    birth_date: z.union([z.string(), z.date()]).optional(),
    job: z.string().optional(),                     
    Awards_Personnes: z.any().optional(),        
    ActedMovies: z.any().optional(),              
    WrittenMovies: z.any().optional(),            
    isDerector: z.any().optional(),  
})

export const RatingSchena = z.object({
    
    ID_Rating: z.number(),
    rate_picture: z.number(),
    rate_actor_game: z.number(),
    rate_cinematography: z.number(),
    rate_sound: z.number(),
    rate_writing: z.number(),
    Movie: z.any().optional(),
    User: z.any().optional(),

    
})

export const MovieSchema = z.object({
    ID_Movie: z.number(),
    title: z.string(),
    cover:  z.any().optional(),             
    release_date: z.union([z.string(), z.date()]).optional(),
    directed_by:  z.any().optional(),       
    Ratings: z.array(RatingSchena),            
    Comments:  z.any().optional(),           
    Tags: z.any().optional(),             
    Companies:  z.any().optional(),          
    Awards_Movies:  z.any().optional(),       
    Actors: z.array(PersonSchema),           
    Writers:  z.any().optional(),          
    Director: z.any().optional(),      // TODO check replace any by Person     
    Genres:  z.any().optional(),  
})

export const MoviesArraySchema = z.array(MovieSchema) 