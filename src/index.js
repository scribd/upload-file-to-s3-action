const exec = require('@actions/exec')
const core = require('@actions/core')
const glob = require('@actions/glob')

async function run() {
  try {
    // set the AWS env variables
    process.env.AWS_ACCESS_KEY_ID = core.getInput('access-key-id')
    process.env.AWS_SECRET_ACCESS_KEY = core.getInput('secret-access-key')
    process.env.AWS_DEFAULT_REGION = core.getInput('region')

    // find the first matching file
    const globber = await glob.create(core.getInput('path'))
    const files = await globber.glob()

    // confirm a file was found
    if (files.length <= 0) {
      throw `No files matching the pattern '${core.getInput('path')}' found. Exiting.`
    }

    // upload the file
    const path = files[0]
    const destinationPath = core.getInput('destination') || path
    await exec.exec('aws', ['s3', 'cp', path, `s3://${core.getInput('bucket')}/${destinationPath}`, '--region', core.getInput('region'), '--acl', core.getInput('permissions'), '--no-progress'])
  } catch (error) {
    core.setFailed(error)
  }
}

run()
