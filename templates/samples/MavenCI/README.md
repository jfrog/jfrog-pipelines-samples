# Maven CI Template
This template will create a pipeline that showcases the features of the [MvnBuild](https://www.jfrog.com/confluence/display/JFROG/MvnBuild) native step.

## Features
- building a Maven project and pushing the resulting artifacts to Artifactory
- publishing an Artifactory build and updating an output [BuildInfo](https://www.jfrog.com/confluence/display/JFROG/BuildInfo) resource
- utilizing JFrog Xray to scan the artifacts for security vulnerabilities
- writing to an output [FileSpec](https://www.jfrog.com/confluence/display/JFROG/FileSpec) resource that can be connected to another pipeline.

## Resources
Three resources are defined in this pipeline.
- [GitRepo](https://www.jfrog.com/confluence/display/JFROG/GitRepo): This resource represents the repository containing the Gradle project to be built.
- [FileSpec](https://www.jfrog.com/confluence/display/JFROG/FileSpec): The FileSpec output resource can be used as an input resource to a step in another pipeline to automatically download the files described. In this pipeline, the FileSpec resource is updated to reference files, filtered by an optional pattern provided, that are part of the uploaded build information.
- [BuildInfo](https://www.jfrog.com/confluence/display/JFROG/BuildInfo): A resource that is used as a reference to your published Artifactory build. This resource can later be used to promote, scan, and bundle your Artifacts to prepare for release.

## Steps
This pipeline contains 1 step. Specifically, the [MvnBuild](https://www.jfrog.com/confluence/display/JFROG/MvnBuild)) native step.

### Recommended Settings
- **command:** This is the Maven command to execute. It defaults to "clean install" if not specified.
- **sourceLocation:** This is the location in your repository from which to issue the Maven command. It defaults to the root of the repository if not specified.
- **resolverSnapshotRepo:** This is the name of the Artifactory repository from where snapshot dependencies are resolved.
- **resolverReleaseRepo:** This is the name of the Artifactory repository from where release dependencies are resolved.
- **deployerSnapshotRepo:** This is the name of the Artifactory repository where artifacts for snapshot builds are published.
- **deployerReleaseRepo:** This is the name of the Artifactory repository where artifacts for release builds are published.
- **publishBuild:** Setting to "true" will configure the step to collect and publish Artifactory Build information. This can be used later for promotion and creating release bundles from your artifacts.
- **scanBuild:** This will trigger a JFrog Xray scan of your build to ensure no violations are found
- **buildSpecPattern:** This will be used to store a reference to your artifact. It can be used in another pipeline as an input to download the Artifact. For example if you want your .jar to be included in a Docker container, you might use this resource as an input to a pipeline that uses the [DockerBuild](https://www.jfrog.com/confluence/display/JFROG/DockerBuild) and [DockerPush](https://www.jfrog.com/confluence/display/JFROG/DockerPush) steps.