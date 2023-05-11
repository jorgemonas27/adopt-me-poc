import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

 export default function useBreedList(animal) {
    const results = useQuery(["breeds", animal], fetchBreedList);

    //the ? operator said "ok if this is available give it me now,if not give me an error"
    return [results?.data?.breeds ?? [], results.status]
 }