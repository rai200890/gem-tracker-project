function Project($resource) {
    return $resource("/api/projects/:id.json",{ id: '@id' }, {
        create:  { method: 'POST' },
        show: { method: 'GET'}
    });
}