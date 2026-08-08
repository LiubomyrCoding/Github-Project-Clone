(function () {
    function Git(name) {
        this.name = name; // Repo name
        this.lastCommitId = -1; // Keep track of last commit id.
        this.HEAD = null; // Reference to last Commit.
    }

    const repo = new Git("my-repo"); // git-init

    function Commit(id, parent, message) {
        this.id = id;
        this.parent = parent;
        this.message = message;
    }

    Git.prototype.commit = function (message) {
        // Increment last commit id and pass into new commit.
        const commit = new Commit(++this.lastCommitId, this.HEAD, message);

        // Update HEAD and current branch.
        this.HEAD = commit;

        return commit;
    };

    Git.prototype.log = function () {
        // Start from HEAD
        let commit = this.HEAD,
            history = [];

        while (commit) {
            history.push(commit);
            // Keep following the parent
            commit = commit.parent;
        }

        return history; // git log
    };

    // Test #1
    repo.commit("Initial commit");
    repo.commit("Change 1");

    let log = repo.log();
    console.assert(log.length === 2); // Should have 2 commits.
    console.assert(!!log[0] && log[0].id === 1); // Commit 1 should be first.
    console.assert(!!log[1] && log[1].id === 0); // And then Commit 0.
})()