# Hello World Introductory Pipeline
This pipeline will showcase a few of the basic features available in JFrog Pipelines. This pipeline utilizes the "HelloWorld" global template which you can read about [here](https://www.jfrog.com/confluence/display/JFROG/Global+Templates)

## Features Showcased
- parallel steps
- writing to and reading from a resource
- using "run variables" to pass information between steps
- customizable environment variables
- different execution sections
- steps connected through a resource

## Resources
Two resources are defined in this pipeline. One is optional and only present if certain information is provided in the values.yml.  The other is always present and is used to showcase the behavior of inputResources and outputResource in the step configurations. [See documentation on defining resources](https://www.jfrog.com/confluence/display/JFROG/Pipelines+Resources)

```
resources:
  - name: intro_bag
    type: PropertyBag
    configuration:
      releaseVersion: ""  # Starts empty but is set at runtime

# This GitRepo resource is conditional based on configurations
# provided in values.yml
  - name: intro_repo
    type: GitRepo
    configuration:
      path: myproject/myrepo
      gitProvider: myGitIntegration
      branches:
        include: "^main$"
```

## Steps
This pipeline contains 5 steps, each showcasing a different feature or aspect of JFrog Pipelines.
### first
This step is the starting point of the pipeline. From here, it splits into two parallel paths. This step shows how to define the different execution sections in the yaml.

### variable_selection
This step shows how you can define an environmentVariables section in your step configuraiton such that the user gets to choose from a predetermined list of values, or enter their own value. [See documentation for more a more detailed description](https://www.jfrog.com/confluence/display/JFROG/Pipelines+Environment+Variables#PipelinesEnvironmentVariables-EnvironmentVariablesConfiguration)


### run_variable
This step shows how you can add a "run variable" that can be referenced in later steps. Adding variable with `add_run_variables` command will ensure that all downstream steps can access that same variable. [See documentation on utilizing state](https://www.jfrog.com/confluence/display/JFROG/Creating+Stateful+Pipelines#CreatingStatefulPipelines-runStateRunState)

### verify_details
This step shows how to access the run variable that was set in the previous step. It also shows how to write key/value pairs to an outputResource. [See documentation on writing to resources](https://www.jfrog.com/confluence/display/JFROG/Pipelines+Resources#PipelinesResources-UsingStatefulResources)

### final
This step shows how to access the information in an inputResource. Resources expose their information via environment variables. Note that this step is not directly connected to any other step. Instead, it is connect via the input resource to another step which has the same resource as an outputResource. [See documentation on using resource variables](https://www.jfrog.com/confluence/display/JFROG/Pipelines+Resources#PipelinesResources-UsingResourcesValuesinEnvironmentVariables)
