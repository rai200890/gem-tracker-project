function Repository($resource) {
    return $resource("api/repositories/:id.json", { id: '@id' }, {
        index:   { method: 'GET', isArray: true },
        show: {method: 'GET', isArray: false}
    });
}