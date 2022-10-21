# HelmPublishAndDeploy (1.1.0)
This template defines a pipeline that publishes a Helm Chart to a Helm repository in Artifactory, creates a Build Info, promotes the Build, and then deploys the Helm Chart from the promoted Build resource using the HelmDeploy native step.

### values.yml
```
artifactoryIntegration: artifactory_integration     # Required. Name of the Artifactory integration.

kubernetesIntegration: kubernetes_integration       # Required. Name of the Kubernetes integration.

GitRepo:                                            # Required.
  name: fooGitRepo                                  # Name of the GitRepo resource. Defaults to GitRepoRes.
  gitProvider: github                               # Required. Name of the SCM integration, which will be used to fetch the SCM repository.
  path: jfrog/jfrog-pipelines-simple-example        # Required. Path to the SCM repository.
  branches:                                         # Optional.
    exclude: ^master$                               # Regex pattern to exclude branches.
    include: ^{{gitBranch}}$                        # Regex pattern to include branches.
  files:                                            # Optional.
    exclude: ^fileName$                             # Regex pattern to exclude files.
    include: ^fileName$                             # Regex pattern to include files.

BuildInfo:                                          # Required.
  name: fooBuild                                    # Name of the BuildInfo resource. Defaults to BuildInfoRes.
  buildName: foo                                    # Optional. Name of the Artifactory Build that will be created. Defaults to $pipeline_name.
  buildNumber: $run_number                          # Optional. Number of the Artifactory Build that will be created. Defaults to $run_number.

BuildInfoPromoted:                                  # Optional.
  name: fooBuildInfoPromoted                        # Name of the promoted BuildInfo resource. Defaults to BuildInfoPromotedRes.
  autoPromotion: false                              # Optional. When set to false, indicates that Build promotion in the pipeline will be manually triggered. Defaults to true.

HelmChart:                                          # Required.
  name: fooHelmChart                                # Name of the HelmChart resource. Defaults to HelmChartRes.
  chartName: foo                                    # Required. Helm chart name.
  chartVersion: 0.0.1                               # Required. Initial Helm chart version.
  repository: foo                                   # Required. The name of the Helm repository in Artifactory.
  helmVersion: 3                                    # Optional. A number representing the major version of Helm to use. Defaults to 3.
  namespace: foo                                    # Optional. Set the namespace used for the Helm operations.

Pipeline:                                           # Optional.
  name: foo                                         # Name of the pipeline. Defaults to HelmDeployPipeline.

HelmPublish:                                        # Required.
  name: HelmPublish                                 # Name of the HelmPublish step. Defaults to HelmPublish.
  chartPath: '.'                                    # Required. The path to the Helm chart YAML in the GitRepo resource.
  flags: '--app-version=foo'                        # Optional. Command line options to pass to the helm package command.
  lint: true                                        # Optional. When set to true performs a lint to examine a Helm chart for possible issues.  Defaults to false.
  lintFlags: '--strict'                             # Optional. Flag string to pass to the helm lint command.
  valueFilePaths:                                   # Optional. Specifies values YAML file(s) that will be used in the helm lint command.
    - values.yaml
    - values2.yaml

PromoteBuild:                                       # Optional.
  name: fooPromoteBuild                             # Name of the PromoteBuild step. Defaults to PromoteBuild.
  targetRepository: fooPromote                      # Required. The name of the repository in Artifactory to promote the build to.
  copy: false                                       # Optional. When set to true, copies the artifacts to the targetRepository vs moving them to the targetRepository. Defaults to false.

HelmDeploy:                                         # Required.
  name: fooHelmDeploy                               # Name of the HelmDeploy step. Defaults to HelmDeploy.
  chartPath: '.'                                    # Required. The path to the Helm chart YAML in the input BuildInfo resource.
  releaseName: foo                                  # Required. The release name. Equivalent to the --name (-n) option of the helm install command.
  flags: '--wait --timeout 900s'                    # Optional. Command line options to pass to the helm upgrade command.
  lint: true                                        # Optional. When set to true performs a lint to examine a Helm chart for possible issues. Defaults to false.
  lintFlags: '--strict'                             # Optional. Flag string to pass to the helm lint command.
  valueFilePaths:                                   # Optional. Specifies values YAML file(s) for use with a --values (-f) option of the helm lint and upgrade commands.
    - values.yaml
    - values2.yaml
  test: true                                        # Optional. When set to true performs a test to run the tests for release. Defaults to false.
  testFlags:                                        # Optional. Flag string to pass to the helm test command.
```
