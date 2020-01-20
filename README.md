# React with React-Router Stater Kit :zap:

![image](https://user-images.githubusercontent.com/22566333/34544690-c669690e-f0b5-11e7-87a6-9672b479f4dc.png)

A basic React with React-Router starter kit with preferred setup.

## Usage

```batch
git clone git@github.com:michaelmang/react-router-starter-kit.git

npm install
```

## Setup

### SASS

CSS pre-processing with SASS

### Project Directory

`components` directory contains React components. `container` subdirectory is for (potentially) stateful components and `layout` subdirectory is for presentational components. _containers_ handle state and other logic (i.e. event handler methods) and _layout_ components simply use inherited props to render a component.

`helpers` directory available for generic helper methods.

`scenes` directory contains the main _views_ of the React application (what is routed with React-Router)

`styles` directory available for JS styling and comes with FlexboxLayouts to be passed as props to components


## Future Improvements

#### Add unit testing setup with enzyme and jest

#### SASS directory setup

#### Redux boilerplate