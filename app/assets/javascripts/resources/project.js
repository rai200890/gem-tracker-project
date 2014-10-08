function Project($resource) {
    return $resource("/api/projects.json", { id: '@id' }, {
        create:  { method: 'POST' }
    });
}