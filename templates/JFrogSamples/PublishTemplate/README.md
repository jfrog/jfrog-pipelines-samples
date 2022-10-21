# PublishTemplate (1.0.0)
This template would be used to upload your own reusable templates from your scm repositories to artifactory.
You can read more about templates [here](https://www.jfrog.com/confluence/display/JFROG/Global+Templates).

## Features
- validates the template
- uploads the template to artifactory

## Resources
Two resources are defined in this pipeline. One is a [GitRepo](https://www.jfrog.com/confluence/display/JFROG/GitRepo) resource, which is designed to contain the repository path where your templates are present. The other resource is [FileSpec](https://www.jfrog.com/confluence/display/JFROG/FileSpec). You are expected to provide a values.yml containing the repository path of your templates.
[See documentation on defining resources](https://www.jfrog.com/confluence/display/JFROG/Pipelines+Resources)

### values.yml
```
templateRepository:
  # scm integration name
  gitProvider: myGitIntegration
  # repository path where your templates are present
  path: someOrg/someRepo
  # branch name where your templates are present in the repository (optional)
  branch: master
  # template folder location, where your templateDefinition.yml file is present
  templateFolder: templates/templateName
 
publishTemplate:
  # Template namespace
  namespace: jfrog_name_space
  # Template name
  name: myPipelineTemplate
  # Template version
  version: 0.0.1
  # name of the pipeline (optional)
  pipelineName: PublishTemplate
   # artifactory integration name
  artifactoryIntegration: myArtifactoryIntegration
```

## Steps
This pipeline contains only one step, a [Bash](https://www.jfrog.com/confluence/display/JFROG/Bash) step, which validates the input template and uploads to artifactory.
