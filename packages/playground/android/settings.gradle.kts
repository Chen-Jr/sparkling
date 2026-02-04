pluginManagement {
    repositories {
        mavenLocal()
google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
}
}

rootProject.name = "Sparkling"
include(":app")
include(":sparkling")
project(":sparkling").projectDir = file("../../../packages/sparkling-sdk/android/sparkling")
include(":sparkling-method")
project(":sparkling-method").projectDir = file("../../../packages/sparkling-method/android")
include(":sparkling-router")
project(":sparkling-router").projectDir = file("../../../packages/methods/sparkling-router/android")
include(":sparkling-storage")
project(":sparkling-storage").projectDir = file("../../../packages/methods/sparkling-storage/android")
include(":sparkling-media")
project(":sparkling-media").projectDir = file("../../../packages/methods/sparkling-media/android")
