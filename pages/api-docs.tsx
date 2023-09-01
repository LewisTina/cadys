import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<{
  spec: any;
}>(import('swagger-ui-react') as any, { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

interface BearerTokenSecurity {
  type: 'http';
  scheme: 'bearer';
  bearerFormat?: string;
}

const tokenRequiredBearer: BearerTokenSecurity = {
  type: 'http',
  scheme: 'bearer'
}


export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Cadys API',
        version: '1.0',
        description: "This is Cadys API. All request in regards to the application can be found here, \n general most of the methods require you being as an active user to be able to access."
      },
      components: {
        securitySchemes: {
          TokenRequired: tokenRequiredBearer
        },

        schemas: {
          
          address: {
            properties:{
              zip_code: 
                {type: "string"},
              city:
                {type: "string"},
              address_title:
                {type: "string"}
          }},
          
          Message : {
            properties:{
                message: {
                  type: "string"
                }
            }
          },

          migration: {
            properties:{
                key: {
                  type: "string"
                }
            }
          },

          LoginWithGoogle:{
            properties:{
                access_token: {
                  type: "string"
                }
            }
          },
          
          UserCreation: {
            properties:{
              first_name: 
                {type: "string"},
              last_name:
                {type: "string"},
              phone:
                {type: "string"},
              sex:
                {type: "string"},
              email: {
                type: "string",
                format: "email"
                },
              password:
                {type: "string"},
            }
          },

          UserUpdate: {
            properties:{
              first_name: 
                {type: "string"},
              last_name:
                {type: "string"},
              phone:
                {type: "string"},
              sex:
                {type: "string"},
            }
          },

          Validation: {
            properties: {
              code:
              {type: "string"},
              email: {
                type: "string",
                format: "email"
              },
            }
          },

          ResetPassword: {
            properties: {
              email: {
                type: "string",
                format: "email"
              },
              new_password:
              {type: "string"},
            }
          },

          ChangePassword: {
            properties: {
              old_password: {
                type: "string",
              },
              new_password:
              {type: "string"},
            }
          },

          Created: {
            properties: {
              message:
              {type: "string"},
              uuid:
              {type: "string"},
            }
          },

          Login: {
            properties: {
              email: {
                type: "string",
                format: "email"
              },
              password:
              {type: "string"},
            }
          },

          ResendCode: {
            properties: {
              email: {
                type: "string",
                format: "email"
              },
            }
          },
          
          BrandCreation: {
            properties:{
              manager_uuid: 
                {type: "string"},
              email_pro: {
                type: "string",
                format: "email"},
              name:
                {type: "string"},
              siret:
                {type: "string"},
              activities:
                {type: "object"},
              address:
                {$ref: '#/components/schemas/address'},
              legal_status:
                {type: "string"},
            }
          },
          
          BrandUpdate: {
            properties:{
              email_pro: {
                type: "string",
                format: "email"},
              name:
                {type: "string"},
              siret:
                {type: "string"},
              activities:
                {type: "object"},
              address:
                {$ref: '#/components/schemas/address'},
              legal_status:
                {type: "string"},
            }
          },

          legal_status: {
            properties:{
              uuid: 
                {type: "string"},
              code: 
                {type: "string"},
              title_i18n:
                {type: "object"}
            }
          },

          company: {
            properties:{
              uuid: 
                {type: "string"},
              email_pro: 
                {type: "string"},
              name:
                {type: "string"},
              siret:
                {type: "string"},
              activities:
                {type: "object"},
              address:
                {$ref: '#/components/schemas/address'},
              legal_status:
                {$ref: "#/components/schemas/legal_status"},
            }
            
          },

          Listing: {
            type: "object"
          },

          userDisplay: {
            properties:{
              first_name: 
                {type: "string"},
              last_name:
                {type: "string"},
              phone:
                {type: "string"},
              sex:
                {type: "string"},
              email:
                {type: "string"},
              password:
                {type: "string"},
              avatar_uuid:
                {type: "string"},
              createdAt: {
                type: "string",
                format: "date-time",
              },
              modifiedAt:{
                type: "string",
                format: "date-time",
              },
              last_login:
                {type: "date"},
            }

          },

          CompanyManager: {
            properties:{
              uuid: 
                {type: "string"},
              manager: 
                {$ref: '#/components/schemas/userDisplay'},
              company:
                {$ref: '#/components/schemas/company'},
              date_added:
                {type: "date"},
            }
          },

          client: {
            properties:{
              email: {
                type: "string",
                format: "email"
              },
            }
          },

          
        RequestQuotation: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email"
          },
          request_date: {
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "description": "Date of the service request"
          },
          start_date: {
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "description": "Date of the intervention"
          },
          end_date: {
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "description": "Date of the intervention"
          },
          address:
            {$ref: '#/components/schemas/address'},
          remark: {
            "type": "string",
            "nullable": true,
            "description": "Remarks for the service request"
          },
          activities: {
            "type": "object",
            "nullable": true,
            "description": "Activities related to the service request"
          },
          is_urgent: {
            "type": "boolean",
            "nullable": true,
            "description": "Indicates if the service request is urgent"
          }
        }
      },

      ChangeMissionState: {
        properties:{
          uuid: {
            type: "string",
            format: "uuid"
          },
          state: {
            type: "string",
            enum: ["PENDING", "IN_PROGRESS", "DONE", "CANCELED", "REJECTED"],
          }
        }
      },

      AcceptOrDeclineMission: {
        properties:{
          mission_uuid: {
            type: "string",
            format: "uuid"
          },
          accept: {
            type: "boolean",
          }
        }
      },

      RequestBrand: {
        properties:{
          mission_uuid: {
            type: "string",
            format: "uuid"
          },
          company_uuid: {
            type: "string",
            format: "uuid"
          }
        }
      },
        }  
      },
        
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
