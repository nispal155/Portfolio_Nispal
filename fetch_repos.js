const fs = require('fs');

async function fetchRepos() {
  const res = await fetch('https://api.github.com/users/nispal155/repos?per_page=100&type=public');
  const repos = await res.json();
  const projects = [];

  for (const repo of repos) {
    if (repo.name === 'nispal155' || repo.name === 'Portfolio_Nispal') continue; // Skip profile readme and current portfolio
    
    console.log("Fetching README for", repo.name);
    let readme = "";
    try {
      const readmeRes = await fetch(`https://api.github.com/repos/nispal155/${repo.name}/readme`);
      if (readmeRes.ok) {
        const data = await readmeRes.json();
        readme = Buffer.from(data.content, 'base64').toString('utf8');
      }
    } catch (e) {
      console.error(e);
    }

    projects.push({
      title: repo.name.replace(/-/g, ' '),
      description: repo.description || "Project from GitHub",
      readmeSnippet: readme.substring(0, 300).replace(/\n/g, ' '),
      technologies: repo.language ? [repo.language] : [],
      repoUrl: repo.html_url,
      liveUrl: repo.homepage || ""
    });
  }
  
  fs.writeFileSync('github_projects_dump.json', JSON.stringify(projects, null, 2));
  console.log("Done. Saved to github_projects_dump.json");
}

fetchRepos();
