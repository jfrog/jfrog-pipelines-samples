# Go CI Template
This template will create a pipeline that showcases the features of the [GoBuild](https://www.jfrog.com/confluence/display/JFROG/GoBuild), [GoPublishBinary](https://www.jfrog.com/confluence/display/JFROG/GoPublishBinary), and [GoPublishModule](https://www.jfrog.com/confluence/display/JFROG/GoPublishModule) native steps, with the option to use just GoBuild and GoPublishBinary, just GoPublishModule, or all three.

## Features
- building a Go project and pushing the resulting artifacts to Artifactory
- publishing Artifactory builds and updating an output [BuildInfo resource](https://www.jfrog.com/confluence/display/JFROG/BuildInfo) for the binary and another for the module
- utilizing JFrog Xray to scan the artifacts for security vulnerabilities
- writing to output [FileSpec resources](https://www.jfrog.com/confluence/display/JFROG/FileSpec) that can connect each output to other pipelines.

## Resources
Up to five resources are defined in this pipeline.
* [GitRepo](https://www.jfrog.com/confluence/display/JFROG/GitRepo): This resource represents the repository containing the Go project to be built.
* [FileSpec](https://www.jfrog.com/confluence/display/JFROG/FileSpec): The FileSpec output resources can be used as input resources to steps in other pipeline to automatically download the files described. In this pipeline, separate FileSpec resources are updated from the binary and module steps to reference files, filtered by an optional pattern provided, that are part of the uploaded build information for each.
* [BuildInfo](https://www.jfrog.com/confluence/display/JFROG/BuildInfo): A resource that is used as a reference to your published Artifactory build. This resource can later be used to promote, scan, and bundle your Artifacts to prepare for release. This pipeline has separate BuildInfo resources for the binary and module steps to allow them to be scanned and promoted independently.


## Steps
This pipeline contains up to three steps. When a target repository for a binary is provided, [GoBuild](https://www.jfrog.com/confluence/display/JFROG/GoBuild) and [GoPublishBinary](https://www.jfrog.com/confluence/display/JFROG/GoPublishBinary) native steps are part of the pipeline. When a target repository for a module is provided, a [GoPublishModule](https://www.jfrog.com/confluence/display/JFROG/GoPublishModule) is part of the pipeline. And when both are provided, all three steps are included.

### Recommended Settings
- **command:** Optional. This may be used to specify a command to use in the GoBuild step.
- **sourceLocation:** The location in your repository from which to issue the Go commands. Defaults to "." if not specified.
- **resolverRepo:** This is the name of the Artifactory repository where you'd like to resolve dependencies.
- **binaryTargetRepository:** This is the name of the Artifactory repository where you'd like publish the binary. If specified, the GoBuild and GoPublishBinary steps will run to publish the binary.
- **moduleTargetRepository:** This is the name of the Artifactory repository where you'd like publish the module. If specified, the GoPublishModule step will run to publish the module.
- **publishBuild:** Setting to "true" will configure the step to collect and publish Artifactory Build information. This can be used later for promotion and creating release bundles from your artifacts.
- **scanBuild:** This will trigger a JFrog Xray scan of your build to ensure no violations are found.
- **binaryBuildSpecPattern:** This will be used to store a reference to your binary artifact as an output FileSpec resource. That resource can be used in another pipeline as an input to download the Artifact. For example if you want your binary to be included in a Docker container, you might use this resource as an input to a pipeline that uses the [DockerBuild](https://www.jfrog.com/confluence/display/JFROG/DockerBuild) and [DockerPush](https://www.jfrog.com/confluence/display/JFROG/DockerPush) steps.
- **moduleBuildSpecPattern:** This will be used to store a reference to your module files as an output FileSpec resource. That resource can be used in another pipeline as an input to download those files.
