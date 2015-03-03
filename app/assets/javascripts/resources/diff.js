function Diff($resource) {
    return $resource("api/diff/new.json",{}, {
        new:  { method: 'GET', isArray: false }
    });
}