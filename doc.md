problems:

- when there are absolute elements in a view those absolute elements' click events would not work if there is no height of the parent view, so to fix this just put some height(e.g., 60) of the parent view or make at least one element relative

links:

- https://github.com/facebook/react-native/issues/21310

- https://stackoverflow.com/questions/52486219/unable-to-resolve-module-babel-runtime-helpers-interoprequiredefault
  - for some issue related to watchman and @babel/runtime/helpers
