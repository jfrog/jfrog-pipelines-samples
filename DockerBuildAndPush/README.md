# DockerBuildAndPush (1.1.0)
This template defines a pipeline which builds a Docker image from a git repository and pushes it to a Docker repository on Artifactory. The minimum required settings are: GitRepo.gitProvider, GitRepo.path, artifactoryIntegration, and DockerBuild.dockerImageName. Setting the tag for the built images as a variable in DockerBuild.dockerImageTag and configuring which SCM branches should trigger the pipeline in GitRepo.branches is highly recommended, but not required.

### values.yml
```
GitRepo:                                            # Required.
  name: fooGitRepo                                  # Name of the GitRepo resource. Defaults to GitRepoRes.
  gitProvider: github                               # Required. Name of the SCM integration that will be used to fetch the SCM repository.
  path: jfrog/jfrog-pipelines-simple-example        # Required. Path of the SCM repository.
  branches:
    exclude: 'master'                               # Regex pattern to exclude branches.
    include: ^{{gitBranch}}$                        # Regex pattern to include branches.

artifactoryIntegration: art                         # Required. Name of the Artifactory integration with which the Docker image will be pushed.

Image:                                              
  name: fooImage                                    # Name of the Image resource. Defaults to ImageRes.
  autoPull: false                                   # Defaults to true.

DockerBuild:                                        # Required.
  name: foobuild                                    # Name of the DockerBuild step. Defaults to DockerBuild.
  dockerImageName: foo                              # Required. Name of the Docker image to be built.
  dockerFileName: foo                               # Name of the Dockerfile. If not specified, the file is assumed to be named "Dockerfile."
  dockerFileLocation: '.'                           # Path to the Dockerfile. If not specified, the file is assumed to be at the root of the git repository.
  dockerImageTag: ${run_number}                     # Name of the Docker image tag. Defaults to latest.

Pipeline:
  name: foo                                         # Name of the pipeline. Defaults to Pipeline.

DockerPush:                                         
  name: foopush                                     # Name of the DockerPush step. Defaults to DockerPush.

BuildInfo:                                          # Optional, if the BuildInfo needs to be published.
  autoPublishBuildInfo: true                        # Defaults to true.
  name: fooBuildInfo                                # Name of the BuildInfo resource. Defaults to BuildInfo.
```
