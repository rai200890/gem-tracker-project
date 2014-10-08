function Project($resource) {
    return $resource("/api/repositories/:id.json", { id: '@id' }, {
        create:  { method: 'POST' }
    });
}