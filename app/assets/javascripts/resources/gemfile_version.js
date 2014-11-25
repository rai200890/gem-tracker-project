function GemfileVersion($resource) {
    return $resource("/api/gemfile_versions/:id.json", { id: '@id' }, {
        index:   { method: 'GET', isArray: true },
        show:   { method: 'GET'}
    });
}