import { decode, JwtPayload, Secret, sign,verify, SignOptions} from 'jsonwebtoken'


interface ITokenService {
    GenerarJWT(payloadJWT: any, vigenciaJWT:string, withRefresh:boolean) : Array<string>,
    VerificarJWT(jwt:string) : JwtPayload | string,
    PayLoadJWT(jwt:string) : JwtPayload | string | null
}

const JWTService:ITokenService = {
    GenerarJWT: function (payloadJWT:any, vigenciaJWT:string, withRefresh:boolean): Array<string> {
        let _tokens:Array<string>=[ 
            { tipo:'accessToken', expiresIn: vigenciaJWT }, 
            { tipo: 'refreshToken', expiresIn: '5h'}
         ]
         .map(
            tok=> { 
                    let _payload=tok.tipo==='accessToken'? { ...payloadJWT } : { email: payloadJWT.email };
                    return sign(
                                { tipo: tok.tipo, ..._payload },
                                 process.env.JWT_SECRETKEY as Secret,
                                { issuer: 'http://localhost:3003', expiresIn: tok.expiresIn } as SignOptions
                                );  
                    }
             );

        return withRefresh ? _tokens : _tokens.slice(0,1);
    },
    VerificarJWT: function (jwt: string) {
        // .verify() method returns decoded payload if the signature is valid and optional expiration, audience, or issuer are valid.
        // If not, it will be called with the error.
        try {
            let _resVerify:JwtPayload | string = verify(jwt, process.env.JWT_SECRETKEY as Secret);

            console.log('payload del jwt....', _resVerify);
            return _resVerify; //<--- paylaod del jwt con claims propios y publicos predfs como exp, iss, iat                

        } catch (error) {
            //token invalido ... o ha expirado(mensaje de error es: 'jwt expired') o firma erronea(mensaje de error es:'invalid token')
            console.log('token invalido....', error);
            return ""; 
        }
    },
    PayLoadJWT: function (jwt: string): JwtPayload | string | null {
        return decode(jwt); //<--- devuelve payload aunque haya expirado, no lo verifica...en optinos puedes pasarle un objeto asi: { json:true | false, complete: true | false }
                            //json: force JSON.parse on the payload even if the header doesn't contain "typ":"JWT".
                            //complete: return an object with the decoded payload and header.
    }
}

export default JWTService;