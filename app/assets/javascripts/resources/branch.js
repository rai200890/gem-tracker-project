function Branch($resource) {
    return $resource("/api/branches/:id.json", { id: '@id' }, {
        index: { method: 'GET', isArray:true },
        show: { method: 'GET'}
    });
}