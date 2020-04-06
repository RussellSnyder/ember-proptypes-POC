import { validate } from 'ember-validators';

// set these in config/environment.js
const ARGUMENT_ERROR_CONSOLE = true;
const ARGUMENT_ERROR_THROW = true;

const translateValidationErrors = (argument, errorObject) => {
  if (errorObject.message) {
    return errorObject.message
  }
  if (errorObject.context.errorMessage) {
    return errorObject.context.errorMessage
  }

  let whiteList;

  switch (errorObject.type) {
    case 'blank': 
      return `${argument} must be passed into the component`;
    case 'inclusion':
      whiteList = errorObject.context.in;
      if (whiteList.length === 1) {
        return `${argument} was set as ${errorObject.value} but must be ${whiteList[0]}`;
      } else if (whiteList.length === 2) {
        whiteList.push(whiteList[1])
        whiteList[1] = "or"
        whiteList = whiteList.join(" ")
        return `${argument} was set as ${errorObject.value} but must be ${whiteList}`;
      } else if (whiteList.length > 1) {
        whiteList = whiteList.join(", ")
        return `${argument} was set as ${errorObject.value}. It must be one of the following: [${whiteList}]`;
      }
  }
}

export const checkArguments = (componentName, componentArguments, argumentValidationObject) => {
  const validationsKeys = Object.keys(argumentValidationObject);
  const errorMessages = [];

  validationsKeys.forEach((validation) => {
    const argument = componentArguments[validation]
    const rules = Object.keys(argumentValidationObject[validation])
    rules.forEach((rule) => {
      const errorObjectOrTrue = validate(rule, argument, argumentValidationObject[validation][rule]);
      if (errorObjectOrTrue !== true) {
        errorMessages.push(translateValidationErrors(validation, errorObjectOrTrue))
      }
    })
  })

  if (errorMessages.length > 0) {
    const message = `${componentName} has the following argument issues:\n${errorMessages.map((message, i) => `${i + 1}. ${message}`).join("\n")}`
    if (ARGUMENT_ERROR_THROW) {
      new Error(message)
    }
    if(ARGUMENT_ERROR_CONSOLE) {
      console.error(`${componentName} has the following argument issues:\n${errorMessages.map((message, i) => `${i + 1}. ${message}`).join("\n")}`)
    }
  }
}