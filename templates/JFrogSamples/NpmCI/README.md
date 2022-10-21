# Npm CI Template
This template will create a pipeline that showcases the features of the [NpmBuild](https://www.jfrog.com/confluence/display/JFROG/NpmBuild) and [NpmPublish](https://www.jfrog.com/confluence/display/JFROG/NpmPublish) native steps.

## Features
- building a NodeJS project and pushing the resulting artifacts to Artifactory
- publishing an Artifactory build and updating an output [BuildInfo resource](https://www.jfrog.com/confluence/display/JFROG/BuildInfo)
- utilizing JFrog Xray to scan the artifacts for security vulnerabilities
- writing to an output [FileSpec resource](https://www.jfrog.com/confluence/display/JFROG/FileSpec) that can connect to another pipeline.

## Resources
Three resources are defined in this pipeline.
* [GitRepo](https://www.jfrog.com/confluence/display/JFROG/GitRepo): This resource represents the repository containing the NodeJS project to be built.
* [FileSpec](https://www.jfrog.com/confluence/display/JFROG/FileSpec): The FileSpec output resource can be used as an input resource to a step in another pipeline to automatically download the files described. In this pipeline, the FileSpec resource is updated to reference files, filtered by an optional pattern provided, that are part of the uploaded build information.
* [BuildInfo](https://www.jfrog.com/confluence/display/JFROG/BuildInfo): A resource that is used as a reference to your published Artifactory build. This resource can later be used to promote, scan, and bundle your Artifacts to prepare for release.


## Steps
This pipeline contains two steps, an [NpmBuild](https://www.jfrog.com/confluence/display/JFROG/NpmBuild) native step and an [NpmPublish](https://www.jfrog.com/confluence/display/JFROG/NpmPublish) native step.

### Recommended Settings
- **npmArgs:** Optional. This will be the part of the command following `npm install` that you wish to run.
- **sourceLocation:** The location in your repository from which to issue the `npm install` command. Defaults to "." if not specified
- **resolverRepo:** This is the name of the Artifactory repository where you'd like to resolve dependencies.
- **deployerRepo:** This is the name of the Artifactory repository where you'd like publish artifacts.
- **publishBuild:** Setting to "true" will configure the step to collect and publish Artifactory Build information. This can be used later for promotion and creating release bundles from your artifacts.
- **scanBuild:** This will trigger a JFrog Xray scan of your build to ensure no violations are found.
- **buildSpecPattern:** This will be used to store a reference to your artifact. It can be used in another pipeline as an input to download the Artifact. For example if you want your files to be included in a Docker container, you might use this resource as an input to a pipeline that uses the [DockerBuild](https://www.jfrog.com/confluence/display/JFROG/DockerBuild) and [DockerPush](https://www.jfrog.com/confluence/display/JFROG/DockerPush) steps.
