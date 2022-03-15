const fs = require('fs');

function getJobsOut() {
  const directories = fs.readdirSync(__dirname).filter(file => fs.statSync(`${__dirname}/${file}`).isDirectory());
  // Find files in each subdirectory
  const jobsOut = [];
  directories.map(dir => {
    const files = fs.readdirSync(`${__dirname}/${dir}`).filter(file => fs.statSync(`${__dirname}/${dir}/${file}`).isFile());
    // Keep only files that have "dev" in their name
    const devFiles = files.filter(file => file.includes('dev'));
    // For each file, require it and add it to the list of jobs
    devFiles.map(file => {
      const { jobOut } = require(`./${dir}/${file}`);
      jobsOut.push(jobOut);
    });
  });
  
  return jobsOut;
}

function findJob(id) {
  let result = false;
  const directories = fs.readdirSync(__dirname).filter(file => fs.statSync(`${__dirname}/${file}`).isDirectory());
  // Find files in each subdirectory
  directories.map(dir => {
    const files = fs.readdirSync(`${__dirname}/${dir}`).filter(file => fs.statSync(`${__dirname}/${dir}/${file}`).isFile());
    // Keep only files that have "dev" in their name
    const devFiles = files.filter(file => file.includes('dev'));
    // For each file, require it and add it to the list of jobs
    devFiles.map(file => {
      // If id is contained in the file name
      if (file.includes(id)) {
        const { jobIn } = require(`./${dir}/${file}`);
        result = jobIn
      }
    });
  });
  
  return result;
}

module.exports.getJobsOut = getJobsOut;
module.exports.findJob = findJob;