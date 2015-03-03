function Project($resource) {
    return $resource("api/projects/:id.json",{ id: '@id' }, {
        create:  { method: 'POST' },
        update:  { method: 'PUT' },
        show: { method: 'GET', isArray: false}
    });
}