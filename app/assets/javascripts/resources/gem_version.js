function GemVersion($resource) {
    return $resource("/api/gem_versions.json",{}, {
        index:   { method: 'GET', isArray: true }
    });
}