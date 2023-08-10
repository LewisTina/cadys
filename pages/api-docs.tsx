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