const fetchBreedList= async ({queryKey}) => {
    const animal = queryKey[1];

    if (!animal) return [];

    const apiRes = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`); //this is gonna fetch the pets for us
    //react query always want to you show an error if the request fail
    if (!apiRes.ok){
        throw new Error(`breeds/${animal} fetch not ok`);
    }

    return apiRes.json(); //this is a promise, since the method is an async method its ok to return promises
}

export default fetchBreedList;