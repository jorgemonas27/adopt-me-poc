const fetchPet = async ({queryKey}) => {
    const id = queryKey[1];

    const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`); //this is gonna fetch the pets for us
    //react query always want to you show an error if the request fail
    if (!apiRes.ok){
        throw new Error(`details/${id} fetch not ok`);
    }

    return apiRes.json(); //this is a promise, since the method is an async method its ok to return promises
}

export default fetchPet;