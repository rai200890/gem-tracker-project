function GitRepository($resource) {
    return $resource("/api/git_repositories/:id.json", {},{
        create: { method: 'POST' }
    });
}