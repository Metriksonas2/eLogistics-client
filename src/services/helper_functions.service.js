const getQueryParameter = (parameterName) => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    return searchParams.get(parameterName);
}

const helperFunctionsService = {
    getQueryParameter,
}

export default helperFunctionsService;