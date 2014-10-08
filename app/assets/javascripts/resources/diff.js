function Diff($resource) {
    return $resource("/api/diff.json",{}, {
        new:  { method: 'GET' }
    });
}