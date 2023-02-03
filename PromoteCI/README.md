# PromoteCI Template
This template will create a pipeline that showcases the features of the [PromoteBuild](https://www.jfrog.com/confluence/display/JFROG/PromoteBuild) native step.

## Features
- promoting an Artifactory build created by another pipeline
- updating an output [BuildInfo resource](https://www.jfrog.com/confluence/display/JFROG/BuildInfo) with the promoted build info
- using Signed Pipelines to validate the input BuildInfo resource.

## Resources
One [BuildInfo](https://www.jfrog.com/confluence/display/JFROG/BuildInfo) resource is defined in this pipeline to be used as a reference to the promoted build. This BuildInfo can later be used to promote again, scan, or bundle your Artifacts to prepare for release.

Another BuildInfo resource must be provided as an input to the template. This BuildInfo will typically be the output of another pipeline, such as one of the CI template pipelines. If the input belongs to a multi-branch source and you want to use a branch that does not have the same name as this pipeline, a branch may be specified.

## Steps
This pipeline contains one step, a [PromoteBuild](https://www.jfrog.com/confluence/display/JFROG/PromoteBuild) native step.

### Recommended Settings
- **inputBuildInfoResourceName:** Required. The BuildInfo resource referencing the build to promote.
- **targetRepository:** Required. The Artifactory repository to which to promote it.
- **copy:** If true, copy instead of moving the files in the build.
- **includeDependencies:** If true, include dependencies in the promotion.
- **status:** A status for the promoted build. This should be a string.
- **comment:** A comment for the promoted build.
- **failOnValidate:** Validate the input BuildInfo using [Signed Pipelines](https://www.jfrog.com/confluence/display/JFROG/Signed+Pipelines).
