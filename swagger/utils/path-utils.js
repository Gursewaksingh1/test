exports.generateEndpoint = ({ endpoint, methods }) => {
  return {
    [endpoint]: methods,
  };
};
exports.generatePath = ({
  method = "get",
  tags = [],
  summary = "",
  responses = {},
  parameters = [],
  requestBody,
}) => {
  const _parameters = Array.isArray(parameters) ? parameters : [parameters];
  const _tags = Array.isArray(tags) ? tags : [tags];

  const payload = {
    tags: _tags,
    summary,
    responses,
    parameters: _parameters,
  };

  if (requestBody) {
    payload.requestBody = requestBody;
  }

  return {
    [method]: payload,
  };
};

// for sending single file with a given keyname
exports.createSingleFileMultipartFormData = ({
  names,
  contentRef = {},
  example,
}) => {
  let computedNames = [];
  if (typeof names === "string") {
    computedNames.push(names);
  } else if (Array.isArray(names)) {
    computedNames = names;
  }

  const dynamicProperties = {};
  computedNames.forEach((computedName) => {
    dynamicProperties[computedName] = {
      type: "string",
      format: "binary",
    };
  });

  return {
    content: {
      "multipart/form-data": {
        example,
        schema: {
          type: "object",
          properties: {
            ...contentRef,
            ...dynamicProperties,
          },
        },
      },
    },
  };
};

// for sending multiple files with a given keyname
exports.createMultiFileMultipartFormData = ({
  names,
  contentRef = {},
  example,
}) => {
  const computedNames = [];
  if (typeof names === "string") {
    computedNames.push(names);
  } else if (Array.isArray(names)) {
    computedNames = names;
  }

  const dynamicProperties = {};
  computedNames.forEach((computedName) => {
    dynamicProperties[computedName] = {
      type: "string",
      format: "binary",
    };
  });

  computedNames.forEach((computedName) => {
    [computedName] = {
      type: "array",
      items: {
        type: "string",
        format: "binary",
      },
    };
  });

  return {
    content: {
      "multipart/form-data": {
        example,
        schema: {
          type: "object",
          // properties: {
          //   [name]: {
          //     type: "array",
          //     items: {
          //       type: "string",
          //       format: "binary",
          //     },
          //   },
          // },
          properties: {
            ...contentRef,
            ...dynamicProperties,
          },
        },
      },
    },
  };
};

exports.createRequestBody = ({
  description = "",
  contentRef = "",
  required = false,
  example,
}) => {
  return {
    description,
    content: {
      "application/json": {
        schema: {
          $ref: contentRef,
        },
        example,
      },
      "application/xml": {
        schema: {
          $ref: contentRef,
        },
        example,
      },
      "application/x-www-form-urlencoded": {
        schema: {
          $ref: contentRef,
        },
        example,
      },
    },
    required,
  };
};

exports.createResponse = ({ status, description, schemaRef }) => {
  return {
    [status]: {
      description,
      schema: {
        $ref: schemaRef,
      },
    },
  };
};

exports.createPathParameter = ({
  name,
  description,
  required = true,
  schemaType,
}) => {
  return {
    name,
    in: "path",
    description,
    required,
    schema: {
      type: schemaType,
    },
  };
};

exports.createQueryParameter = ({
  name,
  description,
  required = false,
  schemaType,
  schemaExample,
}) => {
  const queryParam = {
    name,
    in: "query",
    description,
    required,
    schema: {
      type: schemaType,
    },
  };
  if (schemaExample) {
    queryParam["example"] = schemaExample;
  }
  return queryParam;
};

exports.createIdParam = ({ name, description, required = true }) => {
  return {
    name,
    description,
    required,
    schemaType: "string",
  };
};
