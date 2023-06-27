
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/users": {
        "post": {
          "operationId": "UsersController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUserDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "user created"
            },
            "400": {
              "description": "email exits"
            }
          },
          "tags": [
            "users"
          ]
        },
        "get": {
          "operationId": "UsersController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "users found"
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/users/{id}": {
        "get": {
          "operationId": "UsersController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "user found"
            },
            "400": {
              "description": "user no exist"
            }
          },
          "tags": [
            "users"
          ]
        },
        "patch": {
          "operationId": "UsersController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUserDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "user updated"
            },
            "400": {
              "description": "user no exist"
            }
          },
          "tags": [
            "users"
          ]
        },
        "delete": {
          "operationId": "UsersController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "user deleted"
            },
            "400": {
              "description": "user no exist"
            }
          },
          "tags": [
            "users"
          ]
        }
      }
    },
    "info": {
      "title": "NTT API",
      "description": "",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "schemas": {
        "CreateUserDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "John"
            },
            "surname": {
              "type": "number",
              "example": "Doe"
            },
            "email": {
              "type": "string",
              "example": "john@doe.es"
            },
            "password": {
              "type": "string",
              "example": "123456"
            },
            "role": {
              "type": "string",
              "example": "admin"
            }
          },
          "required": [
            "name",
            "surname",
            "email",
            "password",
            "role"
          ]
        },
        "UpdateUserDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "John"
            },
            "surname": {
              "type": "number",
              "example": "Doe"
            },
            "email": {
              "type": "string",
              "example": "john@doe.es"
            },
            "password": {
              "type": "string",
              "example": "123456"
            },
            "role": {
              "type": "string",
              "example": "admin"
            }
          }
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
