import fetch from 'node-fetch';


// commit hash from args
const accountId = process.argv[3];
const apiKey = process.argv[2];
const commitHash = process.argv[4];

fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/auth/deployments`, {
  headers: {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  }
})
.then(response => response.json())
.then(data => {
  console.log("Finding ", commitHash);
  const build = data.result.find(build => build.deployment_trigger.metadata.commit_hash === commitHash);
  if (build) {
    console.log(build.url);
    console.log(`::set-output name=url::${build.url}`);
  } else {
    console.error("Build Not Found");
    process.exit(-1);
  }
});